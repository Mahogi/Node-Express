import { RequestHandler } from 'express';
import { ChocolateViewModel, PartialChocolateBody } from '../types';
import chocoDataValidationSchema from '../validation-schemas/choco-data-validation-schema';
import ErrorService, { ServerSetupError } from '../../services/error-service';
import ChocolatesModel from '../model';
import UserModel from '../../models/user-model';

export const createChocolate: RequestHandler<
{},
ChocolateViewModel | ResponseError,
PartialChocolateBody,
{}
> = async (req, res) => {
  // console.log('Trying to create a chocolate');
  try {
    console.log('Trying to validate  a chocolate');
    const chocolateData = chocoDataValidationSchema
      .validateSync(req.body, { abortEarly: false });

    if (req.authData === undefined) throw new ServerSetupError();
    console.log('Trying to fetch user');
    const user = await UserModel.getUserByEmail(req.authData.email);
    console.log(user.id);

    console.log('Trying to create chocolate');
    const createdChocolate = await ChocolatesModel
      .createChocolate({ ...chocolateData, personId: user.id });
    console.log('success');

    res.status(201).json(createdChocolate);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
