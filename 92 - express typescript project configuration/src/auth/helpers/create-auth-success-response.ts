import { AuthSuccessResponse } from '../types';
import TokenSevice from '../../services/token-service';

export const createAuthSuccessResponse = ({
  password,
  ...user
}: UserEntity): AuthSuccessResponse => {
  const token = TokenSevice.create({ email: user.email, role: user.role });

  return {
    token,
    user,
  };
};
