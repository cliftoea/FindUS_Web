import { OrderModel } from '@/modules/order/order-model';

const { fields } = OrderModel;

export default [
  fields.customer,
  fields.products,
  fields.employee,
  fields.delivered,
  fields.attachments,
];
