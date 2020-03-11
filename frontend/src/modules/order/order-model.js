import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import BooleanField from '@/shared/fields/boolean-field';
import { CustomerField } from '@/modules/customer/customer-field';
import { ProductField } from '@/modules/product/product-field';
import { UserField } from '@/modules/auth/user-field';
import FilesField from '@/shared/fields/files-field';

function label(name) {
  return i18n(`entities.order.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  customer: CustomerField.relationToOne('customer', label('customer'), {
    "required": true
  }),
  products: ProductField.relationToMany('products', label('products'), {
    "required": true,
    "min": 1
  }),
  employee: UserField.relationToOne('employee', label('employee'), {}),
  delivered: new BooleanField('delivered', label('delivered')),
  attachments: new FilesField('attachments', label('attachments'), 'order/attachments',{
    "size": 1000000,
    "formats": [
      "txt",
      "pdf"
    ],
    "max": 3
  }),
  createdAt: new DateTimeField(
    'createdAt',
    label('createdAt'),
  ),
  updatedAt: new DateTimeField(
    'updatedAt',
    label('updatedAt'),
  ),
  createdAtRange: new DateTimeRangeField(
    'createdAtRange',
    label('createdAtRange'),
  ),

};

export class OrderModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
