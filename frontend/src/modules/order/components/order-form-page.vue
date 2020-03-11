<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/order' }">
        <app-i18n code="entities.order.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.order.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.order.new.title" v-if="!isEditing"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.order.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.order.new.title" v-if="!isEditing"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="findLoading" v-loading="findLoading"></div>
      
      <app-order-form
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
import OrderForm from '@/modules/order/components/order-form';
import { routerAsync } from '@/app-module';

export default {
  name: 'app-order-form-page',

  props: ['id'],

  components: {
    [OrderForm.name]: OrderForm,
  },

  computed: {
    ...mapGetters({
      record: 'order/form/record',
      findLoading: 'order/form/findLoading',
      saveLoading: 'order/form/saveLoading',
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
      doFind: 'order/form/doFind',
      doNew: 'order/form/doNew',
      doUpdate: 'order/form/doUpdate',
      doCreate: 'order/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/order');
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
