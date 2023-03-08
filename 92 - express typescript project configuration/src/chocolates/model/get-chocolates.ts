import mysql from 'mysql2/promise';
import SQL from './sql';
import { ChocolateViewModel } from '../types';
import config from '../../config';

export const getChocolates = async (): Promise<ChocolateViewModel[]> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const sql = `
    ${SQL.SELECT}
    ${SQL.GROUP}
  `;
  const [chocolates] = await mySqlConnection.query<ChocolateViewModel[]>(sql);

  mySqlConnection.end();

  return chocolates;
};
