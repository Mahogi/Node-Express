import { RequestHandler } from 'express';
import ErrorService from '../../services/error-service';
import registrationDataValidationSchema from '../validation-schemas/registration-data-validation-schema';
import { AuthSuccessResponse, RegistrationBody } from '../types';
import UserModel from '../../models/user-model';
import { createAuthSuccessResponse } from '../helpers/create-auth-success-response';

export const register: RequestHandler<
{},
AuthSuccessResponse | ResponseError,
Partial<RegistrationBody>,
{}
> = async (req, res) => {
  try {
    const { passwordConfirmation, ...registrationData } = registrationDataValidationSchema
      .validateSync(req.body, { abortEarly: false });

    const emailAvailable = await UserModel.emailAvailable(registrationData.email);
    if (!emailAvailable) throw new Error(`Email '${registrationData.email}' is already taken.`);

    const user = await UserModel.createUser(registrationData);

    const authSuccessResponse = createAuthSuccessResponse(user);
    res.status(200).json(authSuccessResponse);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
