import { RequestHandler } from 'express';
import { ChocolateModel } from '../types';
import ChocoService from '../../../services/chocolates-service';

export const deleteChocolate: RequestHandler<
{ id: string | undefined },
ChocolateModel | ResponseError,
{},
{}
> = async (req, res) => {
  const { id } = req.params;

  if (id === undefined) {
    res.status(400).json({ error: 'server setup error' });
    return;
  }

  // console.log('Trying to delete a chocolate');
  try {
    const chocolate = await ChocoService.getOneChocolate(id);
    await ChocoService.deleteChocolate(id);
    res.status(200).json(chocolate);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
