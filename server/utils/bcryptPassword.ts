import bcryptjs from 'bcryptjs';
import AppError from '../models/appError';

const encrypt = async (plainPassword: string) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(plainPassword, salt);
  return hash;
};
const compareEncrypt = async (
  plainPassword: string,
  hashedPassword: string
) => {
  if (!plainPassword) {
    throw new AppError('Password not provided for compare', 400);
  }
  if (!hashedPassword) {
    throw new AppError(
      'The user account is not well setted, contact admin',
      409
    );
  }
  const provePassword = bcryptjs.compareSync(plainPassword, hashedPassword);
  return provePassword;
};

export { encrypt, compareEncrypt };
