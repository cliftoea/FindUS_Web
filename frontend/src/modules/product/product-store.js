import productListStore from '@/modules/product/product-list-store';
import productViewStore from '@/modules/product/product-view-store';
import productImporterStore from '@/modules/product/product-importer-store';
import productFormStore from '@/modules/product/product-form-store';
import productDestroyStore from '@/modules/product/product-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: productDestroyStore,
    form: productFormStore,
    list: productListStore,
    view: productViewStore,
    importer: productImporterStore,
  },
};
