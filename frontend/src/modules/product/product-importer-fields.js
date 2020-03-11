import { ProductModel } from '@/modules/product/product-model';

const { fields } = ProductModel;

export default [
  fields.name,
  fields.description,
  fields.unitPrice,
  fields.photos,
];
