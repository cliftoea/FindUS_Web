import { CustomerModel } from '@/modules/customer/customer-model';

const { fields } = CustomerModel;

export default [
  fields.id,
  fields.name,
  fields.birthdate,
  fields.gender,
  fields.createdAt
];
