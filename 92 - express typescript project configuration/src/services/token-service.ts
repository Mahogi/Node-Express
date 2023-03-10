import jwt from 'jsonwebtoken';
import config from '../config';

// const createToken = (email: string, role: string) => jwt
//   .sign({ email, role }, config.secret.jwtTokenKey);
//
// export default createToken;

// type Data = {
//   email: UserEntity['email'],
//   role: UserEntity['role'],
// };
// type DecodedData = Data & { iat: number };

const create = (data: AuthData) => jwt.sign(data, config.jwtToken.secret, {
  expiresIn: config.jwtToken.expiresIn,
});

const decode = (token: string): DecodedAuthData | null => {
  const data = jwt.decode(token);
  if (data === null) return null;
  if (typeof data === 'string') return null;

  return {
    iat: data.iat as number,
    exp: data.exp as number,
    email: data.email,
  };
};

const TokenSevice = {
  create,
  decode,
};

export default TokenSevice;
