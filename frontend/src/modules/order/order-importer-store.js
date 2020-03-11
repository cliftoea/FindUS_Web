import importerStore from '@/shared/importer/importer-store';
import { OrderService } from '@/modules/order/order-service';
import orderImporterFields from '@/modules/order/order-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  OrderService.import,
  orderImporterFields,
  i18n('entities.order.importer.fileName'),
  i18n('entities.order.importer.hint'),
);
