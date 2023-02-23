import * as yup from 'yup';
import { PartialHouseData } from '../types';
import titleSchema from './property-schemas/title-schema';
import locationSchema from './property-schemas/location-schema';
import imagesSchema from './property-schemas/images-schema';
import priceSchema from './property-schemas/price-schema';
import ratingSchema from './property-schemas/rating-schema';
import hasJaccuziSchema from './property-schemas/hasJaccuziSchema';

const partialHouseDataValidationSchema: yup.ObjectSchema<PartialHouseData> = yup.object({
  title: titleSchema,
  location: locationSchema,
  images: imagesSchema,
  price: priceSchema(),
  rating: ratingSchema,
  hasJacuzzi: hasJaccuziSchema,
}).strict(true);

export default partialHouseDataValidationSchema;
