import routes from '@/modules/order/order-routes';
import store from '@/modules/order/order-store';
import OrderAutocompleteInput from '@/modules/order/components/order-autocomplete-input';

export default {
  components: [OrderAutocompleteInput],
  routes,
  store,
};
