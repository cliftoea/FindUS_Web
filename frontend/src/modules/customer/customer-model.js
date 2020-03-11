import { i18n } from '@/i18n';
import IdField from '@/shared/fields/id-field';
import DateTimeRangeField from '@/shared/fields/date-time-range-field';
import DateTimeField from '@/shared/fields/date-time-field';
import { GenericModel } from '@/shared/model/generic-model';
import StringField from '@/shared/fields/string-field';
import EnumeratorField from '@/shared/fields/enumerator-field';
import DateField from '@/shared/fields/date-field';
import DateRangeField from '@/shared/fields/date-range-field';

function label(name) {
  return i18n(`entities.customer.fields.${name}`);
}

function enumeratorLabel(name, value) {
  return i18n(`entities.customer.enumerators.${name}.${value}`);
}

const fields = {
  id: new IdField('id', label('id')),
  name: new StringField('name', label('name'), {
    "required": true,
    "min": 2,
    "max": 255
  }),
  birthdate: new DateField('birthdate', label('birthdate'), {}),
  gender: new EnumeratorField('gender', label('gender'), [
    { id: 'male', label: enumeratorLabel('gender', 'male') },
    { id: 'female', label: enumeratorLabel('gender', 'female') },
  ],{}),
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
  birthdateRange: new DateRangeField(
    'birthdateRange',
    label('birthdateRange'),
  ),
};

export class CustomerModel extends GenericModel {
  static get fields() {
    return fields;
  }
}
