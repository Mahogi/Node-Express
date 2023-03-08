import mysql from 'mysql2/promise';
import config from '../../config';
import { colonObjectQueryFormat } from '../../services/my-sql';
import SQL from './sql';
import { ChocolateViewModel, PartialChocolateData } from '../types';

type PrepareSqlResult = [string, Record<string, string>];

type PrepareSql = (chocolateData: PartialChocolateData) => PrepareSqlResult;

const prepareImagesSql: PrepareSql = (chocolateData) => {
  const bindingsOrNull = chocolateData.images?.reduce((prevBindings: any, img: string, i: number) => ({
    ...prevBindings,
    [`img${i + 1}`]: img,
  }), {} as Record<string, string>) ?? null;
  const shouldInsert = bindingsOrNull !== null;
  const shouldInsertImages = chocolateData.images !== undefined && chocolateData.images.length > 0;

  const sql = shouldInsert
    ? `
      DELETE FROM chocoImages 
      WHERE chocoImages.chocoId = :id;
    
      ${shouldInsertImages ? `INSERT INTO images (src, houseId) VALUES
        ${Object.keys(bindingsOrNull).map((imgBinding) => `(:${imgBinding}, :id)`).join(',\n')};`
    : ''}
    ` : '';

  const bindings = bindingsOrNull ?? {};

  return [sql, bindings];
};

const prepareIngredientsSql: PrepareSql = (chocolateData) => {
  const sql = chocolateData.ingredients !== undefined ? `
  INSERT INTO ingredients (cocoa, sugar) VALUES
    (:cocoa, :sugar);` : '';
  const bindings = chocolateData.ingredients ?? {};
  return [sql, bindings];
};

const prepareChocoSql: PrepareSql = (chocolateData) => {
  const propsSql = [
    chocolateData.title !== undefined ? 'title = :title' : null,
    chocolateData.brand !== undefined ? 'brand = :brand' : null,
    chocolateData.price !== undefined ? 'price = :price' : null,
    chocolateData.rating !== undefined ? 'rating = :rating' : null,
    chocolateData.hasNuts !== undefined ? 'hasNuts = :hasNuts' : null,
    chocolateData.ingredients !== undefined ? 'ingredientId = LAST_INSERT_ID()' : null,
  ].filter((setPropSql) => setPropSql !== null).join(',\n');

  const sql = propsSql.length > 0 ? `
  UPDATE chocolates SET
    ${propsSql}
    WHERE chocolates.id = :id;
    ` : '';

  const bindings: Record<string, string> = {};
  if (chocolateData.title !== undefined) bindings.title = chocolateData.title;
  if (chocolateData.brand !== undefined) bindings.brand = chocolateData.brand;
  if (chocolateData.price !== undefined) bindings.price = String(chocolateData.price);
  if (chocolateData.rating !== undefined) bindings.rating = String(chocolateData.rating);
  if (chocolateData.hasNuts !== undefined) bindings.hasNuts = chocolateData.hasNuts;

  return [sql, bindings];
};

// const prepareSqlArr = [prepareHouseSql, prepareLocationSql, prepareImagesSql];

export const updateChocolate = async (
  id: string,
  chocoData: PartialChocolateData,
): Promise<ChocolateViewModel> => {
  const mySqlConnection = await mysql.createConnection(config.db);
  mySqlConnection.config.queryFormat = colonObjectQueryFormat;

  // const [preparedSql, bindings] = prepareSqlArr.reduce<PreparationResult>(
  //   ([prevSql, prevBindings], prepareSql) => {
  //     const [sql, binds] = prepareSql(houseData);

  //     return [
  //       sql + prevSql,
  //       { ...prevBindings, ...binds },
  //     ];
  //   },
  //   [`${SQL.SELECT} WHERE h.id = :id ${SQL.GROUP}`, { id }],
  // );

  const [imagesSql, imagesBindings] = prepareImagesSql(chocoData);
  const [ingredientsSql, ingredientsBindings] = prepareIngredientsSql(chocoData);
  const [chocoSql, chocoBindings] = prepareChocoSql(chocoData);

  const preparedSql = `
    ${imagesSql}
    ${ingredientsSql}
    ${chocoSql}
    ${SQL.SELECT}
    WHERE c.id = :id
    ${SQL.GROUP};
  `.trim();

  const bindings = {
    id,
    ...imagesBindings,
    ...ingredientsBindings,
    ...chocoBindings,
  };

  const [queryResultsArr] = await mySqlConnection
    .query<ChocolateViewModel[]>(preparedSql, bindings);
  const updatedChocolate = queryResultsArr.at(-1) as ChocolateViewModel;

  await mySqlConnection.end();

  return updatedChocolate;
};
