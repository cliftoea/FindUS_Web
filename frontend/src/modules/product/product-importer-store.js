import importerStore from '@/shared/importer/importer-store';
import { ProductService } from '@/modules/product/product-service';
import productImporterFields from '@/modules/product/product-importer-fields';
import { i18n } from '@/i18n';

export default importerStore(
  ProductService.import,
  productImporterFields,
  i18n('entities.product.importer.fileName'),
  i18n('entities.product.importer.hint'),
);
