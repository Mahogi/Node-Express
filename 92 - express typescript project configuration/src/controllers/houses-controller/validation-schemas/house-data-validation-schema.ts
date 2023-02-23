import * as yup from 'yup';
import { HouseData } from '../types';

const houseDataValidationSchema: yup.ObjectSchema<HouseData> = yup.object({
  title: yup.string()
    .required('title is required')
    .min(2, 'title must have at least 2 symbols')
    .max(32, 'title can\'t have more than 32 symbols'),

  location: yup
    .object({
      country: yup.string()
        .required('location.title is required')
        .min(2, 'location.title must have at least 2 symbols')
        .max(32, 'location.title can\'t have more than 32 symbols'),
      city: yup.string()
        .required('location.city is required')
        .min(2, 'location.city must have at least 2 symbols')
        .max(32, 'location.city can\'t have more than 32 symbols'),
    })
    .required('location is required'),

  images: yup.array().of(yup.string().required())
    .required('images are required')
    .min(1, 'there must be at least 1 image'),

  price: yup.number()
    .required('price is required')
    .positive('price must be a positive number')
    .test(
      'isPrice',
      'incorrect price format',
      (val) => Number(val.toFixed(2)) === val,
    ),

  rating: yup.number()
    .required('rating is required')
    .positive('rating must be a positive number')
    .max(5, 'rating can\'t be more than 5'),

}).strict(true);

export default houseDataValidationSchema;
