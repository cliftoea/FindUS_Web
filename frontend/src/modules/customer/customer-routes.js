import Layout from '@/modules/layout/components/layout.vue';
import Permissions from '@/security/permissions';

const CustomerListPage = () =>
  import('@/modules/customer/components/customer-list-page.vue');
const CustomerFormPage = () =>
  import('@/modules/customer/components/customer-form-page.vue');
const CustomerViewPage = () =>
  import('@/modules/customer/components/customer-view-page.vue');
const CustomerImporterPage = () =>
  import('@/modules/customer/components/customer-importer-page.vue');
  
export default [
  {
    name: '',
    path: '',
    component: Layout,
    meta: { auth: true },
    children: [
      {
        name: 'customer',
        path: '/customer',
        component: CustomerListPage,
        meta: {
          auth: true,
          permission: Permissions.values.customerView,
        },
      },
      {
        name: 'customerNew',
        path: '/customer/new',
        component: CustomerFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.customerCreate,
        },
      },
      {
        name: 'customerImporter',
        path: '/customer/import',
        component: CustomerImporterPage,
        meta: {
          auth: true,
          permission: Permissions.values.customerImport,
        },
      },
      {
        name: 'customerEdit',
        path: '/customer/:id/edit',
        component: CustomerFormPage,
        meta: {
          auth: true,
          permission: Permissions.values.customerEdit,
        },
        props: true,
      },
      {
        name: 'customerView',
        path: '/customer/:id',
        component: CustomerViewPage,
        meta: {
          auth: true,
          permission: Permissions.values.customerView,
        },
        props: true,
      },
    ],
  },
];
