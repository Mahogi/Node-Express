import mysql from 'mysql2/promise';
import SQL from './sql';
import { ChocolateViewModel, ChocolateData } from '../types';
import config from '../../config';

type CreateChocoQueryResult = [
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  ChocolateViewModel[],
];

export const createChocolate = async (chocolateData: ChocolateData): Promise<ChocolateViewModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
    INSERT INTO ingredients (cocoa, sugar) VALUES 
    (?, ?);
    
    INSERT INTO chocolates (title, brand, price, rating, hasNuts, ingredientId) VALUES
    (?, ?, ?, ?, ?, LAST_INSERT_ID());
    SET @chocoId = LAST_INSERT_ID();

    INSERT INTO chocoImages (src, chocoId) VALUES
    ${chocolateData.chocoImages.map(() => '(?, @chocoId)').join(',\n')};
    ${SQL.SELECT}
    WHERE c.id = @chocoId
    ${SQL.GROUP};
  `;

  const preparedSqlData = [
    chocolateData.ingredients.cocoa,
    chocolateData.ingredients.sugar,
    chocolateData.title,
    chocolateData.brand,
    chocolateData.price,
    chocolateData.rating,
    chocolateData.hasNuts,
    ...chocolateData.chocoImages,
  ];

  const [queryResultsArr] = await mySqlConnection.query(preparedSql, preparedSqlData);
  const [createdChocolate] = (queryResultsArr as CreateChocoQueryResult)[4];
  await mySqlConnection.end();

  // console.log(createdChocolate);
  return createdChocolate;
};
