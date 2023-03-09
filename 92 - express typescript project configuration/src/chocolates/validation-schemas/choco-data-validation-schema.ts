import * as yup from 'yup';
import { ChocolateBody } from '../types';
import ChocoImagesSchema from './property-schemas/choco-images-schema';
import ingredientsSchema from './property-schemas/ingredients-schema';
import priceSchema from './property-schemas/price-schema';
import ratingSchema from './property-schemas/rating-schema';
import titleSchema from './property-schemas/title-schema';
import brandSchema from './property-schemas/brand-schema';
import hasNutsSchema from './property-schemas/hasNutsSchema';

const chocoDataValidationSchema: yup.ObjectSchema<ChocolateBody> = yup.object({
  title: titleSchema.required('title is required'),
  brand: brandSchema.required('brand is required'),
  ingredients: ingredientsSchema.required('ingredients are required'),
  chocoImages: ChocoImagesSchema.required('images are required'),
  price: priceSchema(true),
  rating: ratingSchema.required('rating is required'),
  hasNuts: hasNutsSchema.required('answering about the nuts is required'),
}).strict(true);

export default chocoDataValidationSchema;
