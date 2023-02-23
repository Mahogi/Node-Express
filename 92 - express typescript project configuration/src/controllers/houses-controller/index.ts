import express from 'express';
import { createHouse } from './mutations/create-house';
import { deleteHouse } from './mutations/delete-house';
import { updateHouse } from './mutations/update-house';
import { getHouse } from './queries/get-house';
import { getHouses } from './queries/get-houses';

const housesRouter = express.Router();

housesRouter.get('/', getHouses);
housesRouter.get('/:id', getHouse);

housesRouter.post('/', createHouse);
housesRouter.patch('/:id', updateHouse);
housesRouter.delete('/:id', deleteHouse);

export default housesRouter;
