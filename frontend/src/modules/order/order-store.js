import orderListStore from '@/modules/order/order-list-store';
import orderViewStore from '@/modules/order/order-view-store';
import orderImporterStore from '@/modules/order/order-importer-store';
import orderFormStore from '@/modules/order/order-form-store';
import orderDestroyStore from '@/modules/order/order-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: orderDestroyStore,
    form: orderFormStore,
    list: orderListStore,
    view: orderViewStore,
    importer: orderImporterStore,
  },
};
