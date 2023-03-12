import mysql from 'mysql2/promise';
import { ChocolateViewModel } from '../types';
import SQL from './sql';
import config from '../../config';
import { NotFoundError } from '../../services/error-service';

export const getOneChocolate = async (id: string): Promise<ChocolateViewModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
    ${SQL.SELECT}
    WHERE c.id = ?
    ${SQL.GROUP};
  `;

  const preparedSqlData = [id];
  const [chocolates] = await mySqlConnection
    .query<ChocolateViewModel[]>(preparedSql, preparedSqlData);

  mySqlConnection.end();

  if (chocolates.length === 0) throw new NotFoundError(`chocolate with id <${id}> was not found`);

  return chocolates[0];
};
