import { RequestHandler } from 'express';
import { ChocolateViewModel } from '../types';
import ChocolatesModel from '../model';

export const deleteChocolate: RequestHandler<
{ id: string | undefined },
ChocolateViewModel | ResponseError,
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
    const chocolate = await ChocolatesModel.getOneChocolate(id);
    await ChocolatesModel.deleteChocolate(id);
    res.status(200).json(chocolate);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
