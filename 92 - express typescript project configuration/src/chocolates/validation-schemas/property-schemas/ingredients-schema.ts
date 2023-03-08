import * as yup from 'yup';

const ingredientsSchema = yup
  .object({
    cocoa: yup.string()
      .required('ingredients.cocoa is required')
      .min(2, 'ingredients.cocoa must have at least 2 symbols')
      .max(32, 'ingredients.cocoa can\'t have more than 32 symbols'),
    sugar: yup.string()
      .required('ingredients.sugar is required')
      .min(2, 'ingredients.sugar must have at least 2 symbols')
      .max(32, 'ingredients.sugar can\'t have more than 32 symbols'),
  });

export default ingredientsSchema;

// const locationSchema = yup
//   .object({
//     country: yup.string()
//       .required('location.title is required')
//       .min(2, 'location.title must have at least 2 symbols')
//       .max(32, 'location.title can\'t have more than 32 symbols'),
//     city: yup.string()
//       .required('location.city is required')
//       .min(2, 'location.city must have at least 2 symbols')
//       .max(32, 'location.city can\'t have more than 32 symbols'),
//   });
//
// export default locationSchema;
