<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <app-i18n code="home.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/customer' }">
        <app-i18n code="entities.customer.menu"></app-i18n>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <app-i18n code="entities.customer.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.customer.new.title" v-if="!isEditing"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.customer.edit.title" v-if="isEditing"></app-i18n>
        <app-i18n code="entities.customer.new.title" v-if="!isEditing"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="findLoading" v-loading="findLoading"></div>
      
      <app-customer-form
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
import CustomerForm from '@/modules/customer/components/customer-form';
import { routerAsync } from '@/app-module';

export default {
  name: 'app-customer-form-page',

  props: ['id'],

  components: {
    [CustomerForm.name]: CustomerForm,
  },

  computed: {
    ...mapGetters({
      record: 'customer/form/record',
      findLoading: 'customer/form/findLoading',
      saveLoading: 'customer/form/saveLoading',
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
      doFind: 'customer/form/doFind',
      doNew: 'customer/form/doNew',
      doUpdate: 'customer/form/doUpdate',
      doCreate: 'customer/form/doCreate',
    }),

    doCancel() {
      routerAsync().push('/customer');
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
