import { AppError } from '../models';
import { AuthService, BarService, VerificationService } from '../services';
import {
  catchAsync,
  generateRandomPin,
  sendLinkToRecoveryPassword,
  sendPinCode,
} from '../utils';
import { tokenSign } from '../utils/jwt';

const authService = new AuthService();
const barService = new BarService();
const verificationService = new VerificationService();

const logIn = catchAsync(async (req, res) => {
  const { userName, password } = req.body;
  const bar = await authService.checkBarCredentials(userName, password);
  const token = tokenSign(bar.id, 'barSession');
  res.status(200).json({
    status: true,
    token,
    bar,
  });
});
const logInProfile = catchAsync(async (req, res) => {
  const { pinCode, profileId } = req.body;
  const { barSession, profileSession } = res.locals;
  const barId = barSession ? barSession.id : profileSession.barId;
  const profile = await authService.checkProfileCredentials(
    +profileId,
    pinCode,
    barId
  );
  const token = tokenSign(profile.id, 'profileSession');
  res.status(200).json({
    status: true,
    token,
    profile,
  });
});

const signUp = catchAsync(async (req, res) => {
  const { body } = req;
  const pinCode = generateRandomPin(6);

  const bar = await barService.createAuthBar(body, pinCode);

  sendPinCode(bar.email, `Su pin es: ${pinCode}`);
  const result = {
    status: true,
    bar,
    pin: pinCode,
  };
  res.status(201).json(result);
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const bar = await barService.findBarByEmailOr404(email);
  const code = generateRandomPin(4);
  await verificationService.saveCode({ code, barId: bar.id });
  sendLinkToRecoveryPassword(bar.email, bar.name, code);
  res.status(200).json({
    status: true,
    msg: 'Se envio un codigo para restablecer su contraseña a su correo',
  });
});
const newPassword = catchAsync(async (req, res) => {
  const { newPassword, verifyPassword, code } = req.body;
  if (newPassword !== verifyPassword)
    throw new AppError('Contraseñas con coinciden.', 400);
  const verification = await verificationService.verifyCode(code);
  await barService.updatePasswordBar(verification.barId, newPassword);

  res.status(200).json({
    status: true,
    msg: 'Contraseña restablecida exitosamente.',
  });
});

export { signUp, logIn, logInProfile, forgotPassword, newPassword };
