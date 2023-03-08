import express, { RequestHandler } from 'express';
import authMiddleware from '../middleware/auth-middleware';
import { getOneChocolate } from './queries/get-one-chocolate';
import { getChocolates } from './queries/get-chocolates';
import { createChocolate } from './mutations/create-chocolate';
import { deleteChocolate } from './mutations/delete-house';
import { updateChocolate } from './mutations/update-chocolate';

const chocolateRouter = express.Router();

chocolateRouter.get('/', getChocolates);
chocolateRouter.get('/:id', getOneChocolate);

chocolateRouter.post('/', authMiddleware, createChocolate);
chocolateRouter.patch('/:id', authMiddleware, updateChocolate as RequestHandler);
chocolateRouter.delete('/:id', authMiddleware, deleteChocolate as RequestHandler);

export default chocolateRouter;

// import express from 'express';
// import { createHouse } from './mutations/create-house';
// import { deleteHouse } from './mutations/delete-house';
// import { updateHouse } from './mutations/update-house';
// import { getHouse } from './queries/get-house';
// import { getHouses } from './queries/get-houses';
//
// const housesRouter = express.Router();
//
// housesRouter.get('/', getHouses);
// housesRouter.get('/:id', getHouse);
//
// housesRouter.post('/', createHouse);
// housesRouter.patch('/:id', updateHouse);
// housesRouter.delete('/:id', deleteHouse);
//
// export default housesRouter;
