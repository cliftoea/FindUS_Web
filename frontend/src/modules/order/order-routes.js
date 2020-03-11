import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const OrderListPage = () =>
  import('@/modules/order/components/order-list-page.vue');
const OrderFormPage = () =>
  import('@/modules/order/components/order-form-page.vue');
const OrderViewPage = () =>
  import('@/modules/order/components/order-view-page.vue');
const OrderImporterPage = () =>
  import('@/modules/order/components/order-importer-page.vue');

export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'order',
        path: '/order',
        component: OrderListPage,
        meta: {
          auth: true,
          permission: Permissions.values.orderView,
        },
      },
      {
        name: 'orderNew',
        path: '/order/new',
        component: OrderFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.orderCreate,
        },
      },
      {
        name: 'orderImporter',
        path: '/order/import',
        component: OrderImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.orderImport,
        },
      },
      {
        name: 'orderEdit',
        path: '/order/:id/edit',
        component: OrderFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.orderEdit,
        },
        props: true,
      },
      {
        name: 'orderView',
        path: '/order/:id',
        component: OrderViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.orderView,
        },
        props: true,
      },
    ],
  },
];
