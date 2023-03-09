import { RequestHandler } from 'express';
import { ChocolateViewModel, PartialChocolateBody } from '../types';
import ChocolatesModel from '../model';
import partialChocoDataValidationSchema from '../validation-schemas/partial-choco-data-validation-schema';
import ErrorService, { ServerSetupError } from '../../services/error-service';

export const updateChocolate: RequestHandler<
{ id: string | undefined },
ChocolateViewModel | ResponseError,
PartialChocolateBody,
{}
> = async (req, res) => {
  const { id } = req.params;

  // const foundChocoIndex = chocolates.findIndex((choco) => choco.id === id);

  // if (foundChocoIndex === -1) {
  //   res.status(400).json({ error: `chocolate was not found with id '${id}'` });
  //   return;
  // }

  try {
    if (id === undefined) throw new ServerSetupError();
    const partialChocoData = partialChocoDataValidationSchema.validateSync(
      req.body,
      { abortEarly: false },
    );

    const updatedChocolate = await ChocolatesModel.updateChocolate(id, partialChocoData);
    res.status(200).json(updatedChocolate);
  // try {
  //   const partialChocolateData = partialChocoDataValidationSchema.validateSync(
  //     req.body,
  //     { abortEarly: false },
  //   );
  //   const foundChoco = chocolates[foundChocoIndex];
  //
  //   const updatedChoco: ChocolateModel = {
  //     ...foundChoco,
  //     ...partialChocolateData,
  //   };
  //
  //   chocolates.splice(foundChocoIndex, 1, updatedChoco);
  //
  //   res.status(200).json(updatedChoco);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};

// export const updateHouse: RequestHandler<
// { id: string | undefined },
// HouseModel | ResponseError,
// PartialHouseData,
// {}
// > = (req, res) => {
//   const { id } = req.params;
//
//   if (id === undefined) {
//     res.status(400).json({ error: 'server setup error' });
//     return;
//   }
//
//   const foundHouseIndex = chocolates.findIndex((house) => house.id === id);
//
//   if (foundHouseIndex === -1) {
//     res.status(400).json({ error: `house was not found with id '${id}'` });
//     return;
//   }
//
//   try {
//     const partialHouseData = partialChocoDataValidationSchema.validateSync(
//       req.body,
//       { abortEarly: false },
//     );
//     const foundHouse = chocolates[foundHouseIndex];
//
//     const updatedHouse: HouseModel = {
//       ...foundHouse,
//       ...partialHouseData,
//     };
//
//     chocolates.splice(foundHouseIndex, 1, updatedHouse);
//
//     res.status(200).json(updatedHouse);
//   } catch (err) {
//     if (err instanceof ValidationError) {
//       const manyErrors = err.errors.length > 1;
//       res.status(400).json({
//         error: manyErrors ? 'Validation errors' : err.errors[0],
//         errors: manyErrors ? err.errors : undefined,
//       });
//     } else if (err instanceof Error) {
//       res.status(400).json({ error: err.message });
//     } else {
//       res.status(400).json({ error: 'Request error' });
//     }
//   }
// };
