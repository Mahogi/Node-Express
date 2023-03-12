import * as yup from 'yup';
import { PartialChocolateBody } from '../types';
import titleSchema from './property-schemas/title-schema';
import ingredientsSchema from './property-schemas/ingredients-schema';
import ChocoImagesSchema from './property-schemas/choco-images-schema';
import priceSchema from './property-schemas/price-schema';
import ratingSchema from './property-schemas/rating-schema';
import brandSchema from './property-schemas/brand-schema';
import hasNutsSchema from './property-schemas/hasNutsSchema';

const partialChocoDataValidationSchema: yup.ObjectSchema<PartialChocolateBody> = yup.object({
  title: titleSchema,
  brand: brandSchema,
  ingredients: ingredientsSchema,
  chocoImages: ChocoImagesSchema,
  price: priceSchema(),
  rating: ratingSchema,
  hasNuts: hasNutsSchema,
}).strict(true);

export default partialChocoDataValidationSchema;
