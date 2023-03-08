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

const create = (data: AuthData) => jwt.sign(data, config.secret.jwtTokenKey);

const decode = (token: string) => jwt.decode(token) as (DecodedAuthData | null);

const TokenSevice = {
  create,
  decode,
};

export default TokenSevice;
