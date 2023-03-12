import { RequestHandler } from 'express';
import { ChocolateViewModel } from '../types';
import ChocolatesModel from '../model';
import ErrorService, { ForbiddenError, ServerSetupError } from '../../services/error-service';
import UserModel from '../../models/user-model';

export const deleteChocolate: RequestHandler<
{ id: string | undefined },
ChocolateViewModel | ResponseError,
{},
{}
> = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === undefined) throw new ServerSetupError();
    if (req.authData === undefined) throw new ServerSetupError();
    const user = await UserModel.getUserByEmail(req.authData.email);

    const chocolate = await ChocolatesModel.getOneChocolate(id);
    if (user.role !== 'ADMIN' && user.id !== chocolate.person.id) throw new ForbiddenError();

    await ChocolatesModel.deleteChocolate(id);
    res.status(200).json(chocolate);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
