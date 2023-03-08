import { RequestHandler } from 'express';
import { ChocolateViewModel } from '../types';
import ErrorService, { ServerSetupError } from '../../services/error-service';
import ChocolatesModel from '../model';

// import mysql from 'mysql2/promise';
// import config from '../../../config';
// import chocolates from '../chocolate-data';

export const getOneChocolate: RequestHandler<
{ id: string | undefined },
ChocolateViewModel | ResponseError,
{},
{}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    const chocolate = await ChocolatesModel.getOneChocolate(id);

    res.status(200).json(chocolate);
  } catch (error) {
    const [status, errorResponse] = ErrorService.handleError(error);
    res.status(status).json(errorResponse);
    console.log(status);
    console.log(errorResponse);
  }

  // const mySqlConnection = await mysql.createConnection(config.db);
  // const [chocolates] = await mySqlConnection.query<ChocolateModel[]>(`
  //   SELECT c.id, c.title, c.brand, i.cocoa, i.sugar, c.price, c.rating, JSON_ARRAYAGG(img.src)
  //   FROM chocoImages as img
  //   LEFT JOIN chocolates as c
  //   ON img.chocoId = c.id
  //   LEFT JOIN  ingredients as i
  //   ON c.ingredientId = i.id
  //   WHERE c.id = ${id}
  //   GROUP BY c.id;
  //  `);
  // await mySqlConnection.end();
  //
  // if (chocolates.length === 0) {
  //   res.status(404).json({ error: `chocolate with id <${id}> was not found` });
  //   return;
  // }
  //
  // res.status(200).json(chocolates[0]);
};
//-----------------------------
// export const getHouse: RequestHandler<
//   { id: string | undefined },
//   HouseModel | ResponseError,
//   {},
//   {}
//   > = (req, res) => {
//   const { id } = req.params;
//
//   if (id === undefined) {
//     res.status(400).json({ error: 'server setup error' });
//     return;
//   }
//
//   const foundHouse = chocolates.find((house) => house.id === id);
//
//   if (foundHouse === undefined) {
//     res.status(400).json({ error: `house was not found with id '${id}'` });
//     return;
//   }
//
//   res.status(200).json(foundHouse);
// };
