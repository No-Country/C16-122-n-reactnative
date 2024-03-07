import { VerificationModel } from '../database/models';
import { VerificationProps } from '../interfaces';
import { AppError } from '../models';
import BarService from './bar.services';

const barService = new BarService();
class VerificationService {
  constructor() {}
  async saveCode({ code, barId }: VerificationProps) {
    const existCode = await VerificationModel.findOne({
      where: {
        barId,
      },
    });
    if (existCode) {
      existCode.update({
        code,
        expiresAt: Date.now() + 180000,
      });
      return existCode;
    } else {
      const verification = await VerificationModel.create({
        code,
        expiresAt: Date.now() + 180000,
        barId,
      });
      return verification;
    }
  }
  async verifyCode(code: string) {
    if (!code) throw new AppError('Datos incorrectosss.', 400);
    const verification = await VerificationModel.findOne({
      where: {
        code,
      },
    });
    if (!verification) throw new AppError('Algo salio mal', 404);
    if (Math.sign(verification.expiresAt - Date.now()) === -1)
      throw new AppError(
        'El proceso expiro, vuelva a enviar otra solicitud de recuperacion.',
        401
      );
    await verification.update({ code: 'finish' });
    return verification;
  }
}

export default VerificationService;
