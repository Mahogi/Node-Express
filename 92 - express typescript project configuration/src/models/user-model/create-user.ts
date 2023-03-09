import mysql from 'mysql2/promise';
import config from '../../config';
import { UserEntityRow } from '../../auth/types';
import SQL from './sql';
import BcryptService from '../../services/brcypt-service';

type UserData = {
  email: string,
  password: string,
  name: string,
  surname: string,
  photo: string,
  isMarried: boolean,
};

export const createUser = async ({
  email,
  password,
  name,
  surname,
  photo,
  isMarried,
}: UserData): Promise<UserEntityRow> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  // hashing the password
  // const hashedPassword = await bcrypt.hash(password, config.secret.bcryptRounds);
  // console.log(hashedPassword);
  const hashedPassword = BcryptService.hash(password);

  const preparedSql = `
    INSERT INTO users (email, password, name, surname, photo, isMarried) VALUES 
    (?, ?, ?, ?, ?, ?);
    ${SQL.SELECT}
    WHERE users.id = LAST_INSERT_ID();
  `;

  // changed password into hashed password
  const preparedSqlData = [email, hashedPassword, name, surname, photo, isMarried];
  const [queryResultsArr] = await mySqlConnection.query(
    preparedSql,
    preparedSqlData,
  );

  const [createdUser] = (queryResultsArr as UserEntityRow[][])[1];

  mySqlConnection.end();

  return createdUser;
};
