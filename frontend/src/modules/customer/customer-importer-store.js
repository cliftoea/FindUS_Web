import importerStore from '@/shared/importer/importer-store';
import { CustomerService } from '@/modules/customer/customer-service';
import customerImporterFields from '@/modules/customer/customer-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  CustomerService.import,
  customerImporterFields,
  i18n('entities.customer.importer.fileName'),
  i18n('entities.customer.importer.hint'),
);
