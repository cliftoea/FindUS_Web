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
        <app-i18n code="entities.product.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.product.new.title" v-if="!isEditing"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.product.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.product.new.title" v-if="!isEditing"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="findLoading" v-loading="findLoading"></div>
      
      <app-product-form
        :isEditing="isEditing"
        :record="record"
        :saveLoading="saveLoading"
        @cancel="doCancel"
        @submit="doSubmit"
        v-if="!findLoading"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductForm from '@/modules/product/components/product-form';
import { routerAsync } from '@/app-module';

export default {
  name: 'app-product-form-page',

  props: ['id'],

  components: {
    [ProductForm.name]: ProductForm,
  },

  computed: {
    ...mapGetters({
      record: 'product/form/record',
      findLoading: 'product/form/findLoading',
      saveLoading: 'product/form/saveLoading',
    }),

    isEditing() {
      return !!this.id;
    },
  },

  async created() {
    if (this.isEditing) {
      await this.doFind(this.id);
    } else {
      await this.doNew();
    }
  },

  methods: {
    ...mapActions({
      doFind: 'product/form/doFind',
      doNew: 'product/form/doNew',
      doUpdate: 'product/form/doUpdate',
      doCreate: 'product/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/product');
    },

    async doSubmit(payload) {
      if (this.isEditing) {
        return this.doUpdate(payload);
      } else {
        return this.doCreate(payload.values);
      }
    },
  },
};
</script>

<style>
</style>
