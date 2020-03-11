<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.product.menu"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.product.list.title"></app-i18n>
      </h1>

      <app-product-list-toolbar></app-product-list-toolbar>
      <app-product-list-filter></app-product-list-filter>
      <app-product-list-table></app-product-list-table>
    </div>
  </div>
</template>

<script>
import ProductListFilter from '@/modules/product/components/product-list-filter.vue';
import ProductListTable from '@/modules/product/components/product-list-table.vue';
import ProductListToolbar from '@/modules/product/components/product-list-toolbar.vue';

export default {
  name: 'app-product-list-page',

  components: {
    [ProductListFilter.name]: ProductListFilter,
    [ProductListTable.name]: ProductListTable,
    [ProductListToolbar.name]: ProductListToolbar,
  },
};
</script>

<style>
</style>
