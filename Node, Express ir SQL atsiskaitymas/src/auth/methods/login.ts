import { RequestHandler } from 'express';
import ErrorService from '../../services/error-service';
import { CredentialsPartial, AuthSuccessResponse } from '../types';
import credentialsValidationSchema from '../validation-schemas/credentials-validation-schema';
import UserModel from '../../models/user-model';
import BcryptService from '../../services/brcypt-service';
import { createAuthSuccessResponse } from '../helpers/create-auth-success-response';

export const login: RequestHandler<
{},
AuthSuccessResponse | ResponseError,
CredentialsPartial,
{}

> = async (req, res) => {
  try {
    const credentials = credentialsValidationSchema.validateSync(req.body, { abortEarly: false });
    const user = await UserModel.getUserByEmail(credentials.email);
    const validPassword = BcryptService.compare(credentials.password, user.password);

    if (!validPassword) throw new Error('Incorrect password');

    // const hashed = await bcrypt.hash(credentials.password, 5);
    // console.log(hashed);

    const authSuccessResponse = createAuthSuccessResponse(user);
    res.status(200).json(authSuccessResponse);
  } catch (err) {
    const [status, errorResponse] = ErrorService.handleError(err);
    res.status(status).json(errorResponse);
  }
};
