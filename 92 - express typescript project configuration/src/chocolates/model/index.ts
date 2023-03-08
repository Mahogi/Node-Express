import { getChocolates } from './get-chocolates';
import { getOneChocolate } from './get-one-chocolate';
import { createChocolate } from './create-chocolate';
import { deleteChocolate } from './delete-house';
import { updateChocolate } from './update-chocolate';

const ChocolatesModel = {
  getOneChocolate,
  getChocolates,
  createChocolate,
  deleteChocolate,
  updateChocolate,
};

export default ChocolatesModel;
