import { RequestHandler } from 'express';
import { ChocolateViewModel } from '../types';
import ErrorService from '../../services/error-service';
import ChocolatesModel from '../model';

export const getChocolates: RequestHandler<
{},
ChocolateViewModel[] | ResponseError,
{},
{}
> = async (req, res) => {
  try {
    const chocolates = await ChocolatesModel.getChocolates();
    res.status(200).json(chocolates);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
  }

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
};
