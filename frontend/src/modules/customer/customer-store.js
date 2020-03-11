import customerListStore from '@/modules/customer/customer-list-store';
import customerViewStore from '@/modules/customer/customer-view-store';
import customerImporterStore from '@/modules/customer/customer-importer-store';
import customerFormStore from '@/modules/customer/customer-form-store';
import customerDestroyStore from '@/modules/customer/customer-destroy-store';

export default {
  namespaced: true,

  modules: {
    destroy: customerDestroyStore,
    form: customerFormStore,
    list: customerListStore,
    view: customerViewStore,
    importer: customerImporterStore,
  },
};
