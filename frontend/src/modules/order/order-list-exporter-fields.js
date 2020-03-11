import { OrderModel } from '@/modules/order/order-model';

const { fields } = OrderModel;

export default [
  fields.id,
  fields.customer,
  fields.products,
  fields.employee,
  fields.attachments,
  fields.createdAt
];
