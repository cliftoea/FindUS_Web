import routes from '@/modules/product/product-routes';
import store from '@/modules/product/product-store';
import ProductAutocompleteInput from '@/modules/product/components/product-autocomplete-input';

export default {
  components: [ProductAutocompleteInput],
  routes,
  store,
};
