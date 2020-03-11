<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.order.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.order.list.title"></app-i18n>
      </h1>

      <app-order-list-toolbar></app-order-list-toolbar>
      <app-order-list-filter></app-order-list-filter>
      <app-order-list-table></app-order-list-table>
    </div>
  </div>
</template>

<script>
import OrderListFilter from '@/modules/order/components/order-list-filter.vue';
import OrderListTable from '@/modules/order/components/order-list-table.vue';
import OrderListToolbar from '@/modules/order/components/order-list-toolbar.vue';

export default {
  name: 'app-order-list-page',

  components: {
    [OrderListFilter.name]: OrderListFilter,
    [OrderListTable.name]: OrderListTable,
    [OrderListToolbar.name]: OrderListToolbar,
  },
};
</script>

<style>
</style>
