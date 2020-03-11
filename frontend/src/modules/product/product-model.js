import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import StringField from '@/shared/fields/string-field';
import DecimalRangeField from '@/shared/fields/decimal-range-field';
import DecimalField from '@/shared/fields/decimal-field';
import ImagesField from '@/shared/fields/images-field';

function label(name) {
  return i18n(`entities.product.fields.${name}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    "required": true,
    "min": 2,
    "max": 255
  }),
  description: new StringField('description', label('description'), {
    "max": 21845
  }),
  unitPrice: new DecimalField('unitPrice', label('unitPrice'), {
    "required": true,
    "scale": 2,
    "min": 0.01,
    "max": 99999
  }),
  photos: new ImagesField('photos', label('photos'), 'product/photos',{
    "max": 3,
    "size": 1000000
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
  unitPriceRange: new DecimalRangeField(
    'unitPriceRange',
    label('unitPriceRange'),
  ),
};

export class ProductModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
