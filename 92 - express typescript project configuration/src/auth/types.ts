import { RowDataPacket } from 'mysql2';

// export type UserEntity = {
//   id: number,
//   email: string,
//   name: string,
//   surname: string,
//   password: string,
//   role: 'ADMIN' | 'USER',
//   photo: string,
//   isMarried: boolean,
// };

export type UserEntityRow = UserEntity & RowDataPacket;

export type UserViewModel = Omit<UserEntity, 'password'>;

export type Credentials = {
  email: string,
  password: string,
};

export type CredentialsPartial = Partial<Credentials>;

export type AuthSuccessResponse = {
  token: string,
  user: UserViewModel,
};

export type RegistrationData = {
  email: string,
  name: string,
  surname: string,
  password: string,
  passwordConfirmation: string,
  photo: string,
  isMarried: boolean,
};
