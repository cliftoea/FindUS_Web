import routes from '@/modules/customer/customer-routes';
import store from '@/modules/customer/customer-store';
import CustomerAutocompleteInput from '@/modules/customer/components/customer-autocomplete-input';

export default {
  components: [CustomerAutocompleteInput],
  routes,
  store,
};
