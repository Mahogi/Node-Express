type UserEntity = {
  id: number,
  email: string,
  password: string,
  name: string,
  surname: string,
  role: 'ADMIN' | 'USER',
  photo: string,
  isMarried: boolean,
};
