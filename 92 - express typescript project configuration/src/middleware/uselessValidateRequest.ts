import { AnySchema } from 'yup';
import { RequestHandler } from 'express';

type Validate = (schema: AnySchema)=> RequestHandler;
const validate: Validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    next();
  } catch (e) {
    if (e instanceof Error) res.status(400).send(e.message);
    else {
      res.status(400).send(e);
    }
  }
};

export default validate;
