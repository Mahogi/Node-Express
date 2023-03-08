import { RequestHandler } from 'express';
import { ChocolateViewModel, PartialChocolateData } from '../types';
import chocoDataValidationSchema from '../validation-schemas/choco-data-validation-schema';
import ErrorService from '../../services/error-service';
import ChocolatesModel from '../model';

export const createChocolate: RequestHandler<
{},
ChocolateViewModel | ResponseError,
PartialChocolateData,
{}
> = async (req, res) => {
  // console.log('Trying to create a chocolate');
  try {
    const chocolateData = chocoDataValidationSchema
      .validateSync(req.body, { abortEarly: false });
    // console.log('chocolateData was validated');
    // const newChocolate: ChocolateModel = { id: createId(), ...chocoData };
    // chocolates.push(newChocolate);
    // console.log(createdChocolate);
    const createdChocolate = await ChocolatesModel.createChocolate(chocolateData);

    res.status(201).json(createdChocolate);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
