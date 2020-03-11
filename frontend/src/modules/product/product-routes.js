import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const ProductListPage = () =>
  import('@/modules/product/components/product-list-page.vue');
const ProductFormPage = () =>
  import('@/modules/product/components/product-form-page.vue');
const ProductViewPage = () =>
  import('@/modules/product/components/product-view-page.vue');
const ProductImporterPage = () =>
  import('@/modules/product/components/product-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'product',
        path: '/product',
        component: ProductListPage,
        meta: {
          auth: true,
          permission: Permissions.values.productView,
        },
      },
      {
        name: 'productNew',
        path: '/product/new',
        component: ProductFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.productCreate,
        },
      },
      {
        name: 'productImporter',
        path: '/product/import',
        component: ProductImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.productImport,
        },
      },
      {
        name: 'productEdit',
        path: '/product/:id/edit',
        component: ProductFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.productEdit,
        },
        props: true,
      },
      {
        name: 'productView',
        path: '/product/:id',
        component: ProductViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.productView,
        },
        props: true,
      },
    ],
  },
];
