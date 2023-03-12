import mysql from 'mysql2/promise';
import config from '../../config';
import { ChocolateViewModel } from '../types';

export const deleteChocolate = async (id: string): Promise<void> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
    DELETE FROM chocoImages WHERE chocoId = ?;
    DELETE from chocolates WHERE id = ?;
    DELETE from ingredients WHERE id = ?;
    `;
  const preparedSqlData = [id, id, id];

  await mySqlConnection.query<ChocolateViewModel[]>(preparedSql, preparedSqlData);

  mySqlConnection.end();
};
