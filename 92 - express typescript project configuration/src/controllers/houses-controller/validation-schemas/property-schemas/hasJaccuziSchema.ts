import * as yup from 'yup';

const hasJacuzzi = yup.boolean()
  .required('answering about the jacuzzi is required');

export default hasJacuzzi;
