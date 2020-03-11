<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.customer.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.customer.list.title"></app-i18n>
      </h1>

      <app-customer-list-toolbar></app-customer-list-toolbar>
      <app-customer-list-filter></app-customer-list-filter>
      <app-customer-list-table></app-customer-list-table>
    </div>
  </div>
</template>

<script>
import CustomerListFilter from '@/modules/customer/components/customer-list-filter.vue';
import CustomerListTable from '@/modules/customer/components/customer-list-table.vue';
import CustomerListToolbar from '@/modules/customer/components/customer-list-toolbar.vue';

export default {
  name: 'app-customer-list-page',

  components: {
    [CustomerListFilter.name]: CustomerListFilter,
    [CustomerListTable.name]: CustomerListTable,
    [CustomerListToolbar.name]: CustomerListToolbar,
  },
};
</script>

<style>
</style>
