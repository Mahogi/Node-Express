import { RequestHandler } from 'express';
import { ChocolateModel } from '../types';
import chocolates from '../chocolate-data';

export const deleteChocolate: RequestHandler<
{ id: string | undefined },
ChocolateModel | ResponseError,
{},
{}
> = (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  const foundChocoIndex = chocolates.findIndex((choco) => choco.id === id);

  if (foundChocoIndex === -1) {
    res.status(400).json({ error: `chocolate was not found with id '${id}'` });
    return;
  }

  const [deletedChoco] = chocolates.splice(foundChocoIndex, 1);

  res.status(204).json(deletedChoco);
};
