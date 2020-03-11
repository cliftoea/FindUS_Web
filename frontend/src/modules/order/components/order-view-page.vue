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
        <app-i18n code="entities.order.view.title"></app-i18n>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <div class="app-content-page">
      <h1 class="app-content-title">
        <app-i18n code="entities.order.view.title"></app-i18n>
      </h1>

      <div class="app-page-spinner" v-if="loading" v-loading="loading"></div>

      <app-order-view-toolbar v-if="record"></app-order-view-toolbar>

      <el-form
        :label-position="labelPosition"
        :label-width="labelWidthForm"
        @submit.prevent.native
        class="form"
        v-if="record"
      >
        <app-view-item-text :label="fields.id.label" :value="presenter(record, 'id')"></app-view-item-text>

        <app-view-item-relation-to-one
          :label="fields.customer.label"
          :permission="fields.customer.readPermission"
          :url="fields.customer.viewUrl"
          :value="presenter(record, 'customer')"
        ></app-view-item-relation-to-one>

        <app-view-item-relation-to-many
          :label="fields.products.label"
          :permission="fields.products.readPermission"
          :url="fields.products.viewUrl"
          :value="presenter(record, 'products')"
        ></app-view-item-relation-to-many>

        <app-view-item-relation-to-one
          :label="fields.employee.label"
          :permission="fields.employee.readPermission"
          :url="fields.employee.viewUrl"
          :value="presenter(record, 'employee')"
        ></app-view-item-relation-to-one>

        <app-view-item-text :label="fields.delivered.label" :value="presenter(record, 'delivered')"></app-view-item-text>

        <app-view-item-file :label="fields.attachments.label" :value="presenter(record, 'attachments')"></app-view-item-file>

        <app-view-item-text :label="fields.createdAt.label" :value="presenter(record, 'createdAt')"></app-view-item-text>

        <app-view-item-text :label="fields.updatedAt.label" :value="presenter(record, 'updatedAt')"></app-view-item-text>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import OrderViewToolbar from '@/modules/order/components/order-view-toolbar.vue';
import { OrderModel } from '@/modules/order/order-model';

const { fields } = OrderModel;

export default {
  name: 'app-order-view-page',

  props: ['id'],

  components: {
    [OrderViewToolbar.name]: OrderViewToolbar,
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
      record: 'order/view/record',
      loading: 'order/view/loading',
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
      doFind: 'order/view/doFind',
    }),

    presenter(record, fieldName) {
      return OrderModel.presenter(record, fieldName);
    },
  },
};
</script>
