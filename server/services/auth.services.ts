import { AppError } from '../models';
import { compareEncrypt } from '../utils';
import BarService from './bar.services';
import ProfileService from './profile.services';

const barService = new BarService();
const profileService = new ProfileService();
class AuthService {
  constructor() {}

  async checkBarCredentials(userName: string, password: string) {
    const bar = await barService.findBarByUserNameOr404(userName);
    const verifyPassword = await compareEncrypt(password, bar.password);
    if (!verifyPassword)
      throw new AppError(
        'Credenciales incorrectas. Verifique su usuario y contraseña.',
        401
      );
    return bar;
  }
  async checkProfileCredentials(
    profileId: number,
    pinCode: string,
    barId: number
  ) {
    const profile = await profileService.findProfileByIdAndBarIdOr404(
      profileId,
      barId
    );
    const verifyPassword = await compareEncrypt(pinCode, profile.pinCode);
    if (!verifyPassword)
      throw new AppError('Credenciales incorrectas. Verifique sus datos.', 401);
    return profile;
  }
}

export default AuthService;
