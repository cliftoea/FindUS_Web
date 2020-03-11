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
        <app-i18n code="entities.product.view.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.product.view.title"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="loading" v-loading="loading"></div>

      <app-product-view-toolbar v-if="record"></app-product-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.id.label" :value="presenter(record, 'id')"></app-view-item-text>

        <app-view-item-text :label="fields.name.label" :value="presenter(record, 'name')"></app-view-item-text>

        <app-view-item-text :label="fields.description.label" :value="presenter(record, 'description')"></app-view-item-text>

        <app-view-item-text :label="fields.unitPrice.label" :value="presenter(record, 'unitPrice')"></app-view-item-text>

        <app-view-item-image :label="fields.photos.label" :value="presenter(record, 'photos')"></app-view-item-image>

        <app-view-item-text :label="fields.createdAt.label" :value="presenter(record, 'createdAt')"></app-view-item-text>

        <app-view-item-text :label="fields.updatedAt.label" :value="presenter(record, 'updatedAt')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductViewToolbar from '@/modules/product/components/product-view-toolbar.vue';
import { ProductModel } from '@/modules/product/product-model';

const { fields } = ProductModel;

export default {
  name: 'app-product-view-page',

  props: ['id'],

  components: {
    [ProductViewToolbar.name]: ProductViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'product/view/record',
      loading: 'product/view/loading',
    }),

    fields() {
      return fields;
    },
  },

  async created() {
    await this.doFind(this.id);
  },

  methods: {
    ...mapActions({
      doFind: 'product/view/doFind',
    }),

    presenter(record, fieldName) {
      return ProductModel.presenter(record, fieldName);
    },
  },
};
</script>
