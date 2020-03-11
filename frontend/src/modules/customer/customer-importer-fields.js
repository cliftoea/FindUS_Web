import { CustomerModel } from '@/modules/customer/customer-model';

const { fields } = CustomerModel;

export default [
  fields.name,
  fields.birthdate,
  fields.gender,
];
