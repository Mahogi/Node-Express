import { RequestHandler } from 'express';
import { ValidationError } from 'yup';
import createId from 'uniqid';
import { ChocolateModel, ChocolateData } from '../types';
import chocolates from '../chocolate-data';
import chocoDataValidationSchema from '../validation-schemas/choco-data-validation-schema';

export const createChocolate: RequestHandler<
{},
ChocolateModel | ResponseError,
ChocolateData,
{}
> = (req, res) => {
  try {
    const chocoData = chocoDataValidationSchema.validateSync(req.body, { abortEarly: false });
    const newChocolate: ChocolateModel = { id: createId(), ...chocoData };
    chocolates.push(newChocolate);

    res.status(201).json(newChocolate);
  } catch (err) {
    if (err instanceof ValidationError) {
      const manyErrors = err.errors.length > 1;
      res.status(400).json({
        error: manyErrors ? 'Validation errors' : err.errors[0],
        errors: manyErrors ? err.errors : undefined,
      });
    } else if (err instanceof Error) {
      res.status(400).json({ error: err.message });
    } else {
      res.status(400).json({ error: 'Request error' });
    }
  }
};
