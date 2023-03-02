import mysql from 'mysql2/promise';
import config from '../config';
import { ChocolateModel, ChocolateData } from '../controllers/chocolates-controller/types';

type CreateChocoQueryResult = [
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  mysql.ResultSetHeader,
  ChocolateModel[],
];

const SQL_SELECT = `SELECT c.id, c.title, c.brand, i.cocoa, i.sugar, c.price, c.rating, JSON_ARRAYAGG(img.src)
    FROM chocoImages as img
    LEFT JOIN chocolates as c
    ON img.chocoId = c.id
    LEFT JOIN  ingredients as i
    ON c.ingredientId = i.id`;
const SQL_GROUP = 'GROUP BY c.id;';
const SQL_WHERE_ID = 'WHERE c.id = ?';

const getChocolates = async (): Promise<ChocolateModel[]> => {
  const mySqlConnection = await mysql.createConnection(config.db);
  const sql = [SQL_SELECT, SQL_GROUP].join('\n');
  const [chocolates] = await mySqlConnection.query<ChocolateModel[]>(sql);
  // const chocolates = await chocolateQuery();

  return chocolates;
};

const getOneChocolate = async (id: string): Promise<ChocolateModel> => {
  // const chocolate = await chocolateQuery({ chocoId: id });
  const mySqlConnection = await mysql.createConnection(config.db);
  const preparedSql = [SQL_SELECT, SQL_WHERE_ID, SQL_GROUP].join('\n');
  const preparedSqlData = [id];
  const [chocolates] = await mySqlConnection.query<ChocolateModel[]>(preparedSql, preparedSqlData);

  mySqlConnection.end();
  if (chocolates.length === 0) {
    throw new Error(`chocolate with id <${id}> was not found`);
  }

  // console.log(chocolates[0]);
  return chocolates[0];
};

const createChocolate = async (chocolateData: ChocolateData): Promise<ChocolateModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  // console.log('--- making preparedSQL ---');
  const preparedSql = `
    INSERT INTO ingredients (cocoa, sugar) VALUES 
    (?, ?);
    
    INSERT INTO chocolates (title, brand, price, rating, hasNuts, ingredientId) VALUES
    (?, ?, ?, ?, ?, LAST_INSERT_ID());
    SET @chocoId = LAST_INSERT_ID();

    INSERT INTO chocoImages (src, chocoId) VALUES
    ${chocolateData.chocoImages.map(() => '(?, @chocoId)').join(',\n')};
    ${SQL_SELECT}
    WHERE c.id = @chocoId
    ${SQL_GROUP};
  `;

  // console.log('--- preparedSQL ---');
  // console.log(preparedSql);
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

const ChocoService = {
  getOneChocolate,
  getChocolates,
  createChocolate,
};

export default ChocoService;
