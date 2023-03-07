import mysql from 'mysql2/promise';
import config from '../config';
import { ChocolateModel, ChocolateData, PartialChocolateData } from '../controllers/chocolates-controller/types';
import { colonObjectQueryFormat } from './my-sql';

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

const deleteChocolate = async (id: string): Promise<void> => {
  const mySqlConnection = await mysql.createConnection(config.db);

  const preparedSql = `
    DELETE FROM chocoImages WHERE chocoId = ?;
    DELETE from chocolates WHERE id = ?;
    DELETE from ingredients WHERE id = ?;
    `;
  const preparedSqlData = [id, id, id];

  await mySqlConnection.query<ChocolateModel[]>(preparedSql, preparedSqlData);

  mySqlConnection.end();
};

const updateChocolate = async (id: string, chocolateData: PartialChocolateData): Promise<ChocolateModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);
  mySqlConnection.config.queryFormat = colonObjectQueryFormat;

  const imagesBindings = chocolateData.chocoImages?.reduce((prevBindings: any, img: string, i: number) => ({
    ...prevBindings,
    [`img${i + 1}`]: img,
  }), {} as Record<string, string>) ?? null;
  const shouldAddNewImages = chocolateData.chocoImages !== undefined && chocolateData.chocoImages.length > 0;

  const imagesUpdatePreparedSql = imagesBindings !== null
    ? `
      DELETE FROM chocoImages 
      WHERE chocoImages.chocoId = :id;
    
      ${shouldAddNewImages ? `INSERT INTO chocoImages (src, chocoId) VALUES
        ${Object.keys(imagesBindings).map((imgBinding) => `(:${imgBinding}, :id)`).join(',\n')};`
    : ''}
    ` : '';

  // Location SQL
  const ingredientsExist = chocolateData.ingredients !== undefined;
  const ingredientsInsertSql = ingredientsExist ? `
    INSERT INTO ingredients (cocoa, sugar) VALUES
    (:cocoa, :sugar);` : '';

  // Property SQL
  const chocoSetPropsSql = [
    chocolateData.title !== undefined ? 'title = :title' : null,
    chocolateData.brand !== undefined ? 'brand = :brand' : null,
    chocolateData.price !== undefined ? 'price = :price' : null,
    chocolateData.rating !== undefined ? 'rating = :rating' : null,
    chocolateData.hasNuts !== undefined ? 'hasNuts = :hasNuts' : null,
    ingredientsExist ? 'ingredientId = LAST_INSERT_ID()' : null,
  ].filter((setPropSql) => setPropSql !== null).join(',\n');

  const preparedSql = `
    ${imagesUpdatePreparedSql}
    ${ingredientsInsertSql}
    ${chocoSetPropsSql.length > 0 ? `
    UPDATE chocolates SET
      ${chocoSetPropsSql}
      WHERE chocolates.id = :id;
    ` : ''}
    
    SELECT 
      c.id, 
      c.title,
      c.brand,
      c.price, 
      JSON_OBJECT('cocoa', i.cocoa, 'sugar', i.sugar) as ingredients,
      c.rating, 
      c.hasNuts,
      IF(COUNT(img.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(img.src)) as chocoImages
    FROM chocolates as c
    LEFT JOIN chocoImages as img
    ON img.chocoId = c.id
    LEFT JOIN  ingredients as i
    ON c.ingredientId = i.id
    WHERE c.id = :id
    GROUP BY c.id;
  `.trim();

  const bindings = {
    id,
    ...imagesBindings,
    ...chocolateData.ingredients,
    title: chocolateData.title,
    brand: chocolateData.brand,
    price: chocolateData.price,
    rating: chocolateData.rating,
    hasNuts: chocolateData.hasNuts,
  };

  const [queryResultsArr] = await mySqlConnection.query<ChocolateModel[]>(preparedSql, bindings);
  const updatedChocolate = queryResultsArr.at(-1) as ChocolateModel;

  await mySqlConnection.end();

  return updatedChocolate;
};

const ChocoService = {
  getOneChocolate,
  getChocolates,
  createChocolate,
  deleteChocolate,
  updateChocolate,
};

export default ChocoService;
