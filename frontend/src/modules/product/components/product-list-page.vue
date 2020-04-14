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

      <div>
        <h1>Automated Posting</h1>
        <p>Submit your content below, we will post it at the peak performance time</p><br>
        <form>
          <div>
            <label for="social_post">Social Account: </label>
            <select id="social_post">
            <option value="fb">Facebook</option>
            <option value="t">Twitter</option>
            </select><br><br>
            <label for="body_post">Post content: </label><br>
            <textarea id="w3mission" rows="4" cols="50">
            </textarea>
          </div><br>
          <div>
            <label for="img_post">Select image: </label>
            <input type="file" id="img_post" name="img" accept="image/*">
          </div><br>
          <input type="submit">
        </form>
      </div>
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
