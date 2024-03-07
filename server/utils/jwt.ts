import jsonwebtoken, { Secret } from 'jsonwebtoken';
import { TokenType } from '../interfaces';

const JWT_SECRET: Secret = process.env.JWT_SECRET || 'helloWorld';
const tokenSign = (id: number, tokenType: TokenType) => {
  const sign = jsonwebtoken.sign(
    {
      id,
      tokenType,
    },
    JWT_SECRET,
    {
      expiresIn: '2h',
    }
  );

  return sign;
};
const verifyToken = (tokenJwt: string) => {
  const tokenVerify = jsonwebtoken.verify(tokenJwt, JWT_SECRET) as {
    id: number;
    tokenType: TokenType;
  };
  return tokenVerify;
};

export { verifyToken, tokenSign };
