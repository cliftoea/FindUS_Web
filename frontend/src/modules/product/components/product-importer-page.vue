<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/product' }">
        <app-i18n code="entities.product.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.product.importer.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.product.importer.title"></app-i18n>
      </h1>

      <app-importer storePath="product/importer"></app-importer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-product-importer-page',
};
</script>

<style>
</style>
