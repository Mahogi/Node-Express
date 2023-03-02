import { RequestHandler } from 'express';
import { ChocolateModel } from '../types';
import ChocoService from '../../../services/chocolates-service';

// import mysql from 'mysql2/promise';
// import config from '../../../config';
// import './services/my-sql';

export const getChocolates: RequestHandler<
{},
ChocolateModel[],
{},
{}
> = async (req, res) => {
  const chocolates = await ChocoService.getChocolates();
  // const mySqlConnection = await mysql.createConnection(config.db);
  // const [chocolates] = await mySqlConnection.query<ChocolateModel[]>(`
  //   SELECT c.id, c.title, c.brand, i.cocoa, i.sugar, c.price, c.rating, JSON_ARRAYAGG(img.src)
  //   FROM chocoImages as img
  //   LEFT JOIN chocolates as c
  //   ON img.chocoId = c.id
  //   LEFT JOIN  ingredients as i
  //   ON c.ingredientId = i.id
  //   GROUP BY c.id;
  //  `);
  // await mySqlConnection.end();
  res.status(200).json(chocolates);
};
