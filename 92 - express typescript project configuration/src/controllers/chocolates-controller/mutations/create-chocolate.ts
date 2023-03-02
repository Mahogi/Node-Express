import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
// import createId from 'uniqid';
import ChocoService from '../../../services/chocolates-service';
import { ChocolateModel, ChocolateData } from '../types';
// import chocolates from '../chocolate-data';
import chocoDataValidationSchema from '../validation-schemas/choco-data-validation-schema';

export const createChocolate: RequestHandler<
{},
ChocolateModel | ResponseError,
ChocolateData,
{}
> = async (req, res) => {
  console.log('Trying to create a chocolate');
  try {
    const chocolateData: ChocolateData = chocoDataValidationSchema
      .validateSync(req.body, { abortEarly: false });
    console.log('chocolateData was validated');
    // const newChocolate: ChocolateModel = { id: createId(), ...chocoData };
    // chocolates.push(newChocolate);
    const createdChocolate = await ChocoService.createChocolate(chocolateData);
    console.log(createdChocolate);
    res.status(201).json(createdChocolate);
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log('validation error?');
      const manyErrors = err.errors.length > 1;
      res.status(400).json({
        error: manyErrors ? 'Validation errors' : err.errors[0],
        errors: manyErrors ? err.errors : undefined,
      });
    } else if (err instanceof Error) {
      console.log('error');
      res.status(400).json({ error: err.message });
    } else {
      console.log('another error');
      res.status(400).json({ error: 'Request error' });
    }
  }
};
