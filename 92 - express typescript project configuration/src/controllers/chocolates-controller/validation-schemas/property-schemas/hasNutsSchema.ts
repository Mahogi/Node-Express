import * as yup from 'yup';

const hasNutsSchema = yup.boolean()
  .required('answering about the nuts is required');

export default hasNutsSchema;

// const hasJacuzzi = yup.boolean()
//   .required('answering about the jacuzzi is required');
//
// export default hasJacuzzi;
