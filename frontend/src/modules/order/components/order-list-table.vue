<template>
  <div>
    <el-table
      :border="true"
      :data="rows"
      @sort-change="doChangeSort"
      ref="table"
      row-key="id"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column :label="fields.id.label" :prop="fields.id.name" sortable="custom">
        <template slot-scope="scope">{{ presenter(scope.row, 'id') }}</template>
      </el-table-column>

      <el-table-column :label="fields.customer.label" :prop="fields.customer.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.customer.label"
            :permission="fields.customer.readPermission"
            :url="fields.customer.viewUrl"
            :value="presenter(scope.row, 'customer')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column :label="fields.products.label" :prop="fields.products.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-many
            :label="fields.products.label"
            :permission="fields.products.readPermission"
            :url="fields.products.viewUrl"
            :value="presenter(scope.row, 'products')"
          ></app-list-item-relation-to-many>
        </template>
      </el-table-column>

      <el-table-column :label="fields.employee.label" :prop="fields.employee.name">
        <template slot-scope="scope">
          <app-list-item-relation-to-one
            :label="fields.employee.label"
            :permission="fields.employee.readPermission"
            :url="fields.employee.viewUrl"
            :value="presenter(scope.row, 'employee')"
          ></app-list-item-relation-to-one>
        </template>
      </el-table-column>

      <el-table-column :label="fields.attachments.label" :prop="fields.attachments.name" align="center">
        <template slot-scope="scope">
          <app-list-item-file :value="presenter(scope.row, 'attachments')"></app-list-item-file>
        </template>
      </el-table-column>

      <el-table-column
        :label="fields.createdAt.label"
        :prop="fields.createdAt.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'createdAt') }}</template>
      </el-table-column>

      <el-table-column :fixed="isMobile? undefined : 'right'" align="center" width="180">
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/order/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link :to="`/order/${scope.row.id}/edit`" v-if="hasPermissionToEdit">
              <el-button type="text">
                <app-i18n code="common.edit"></app-i18n>
              </el-button>
            </router-link>

            <el-button
              :disabled="destroyLoading"
              @click="doDestroyWithConfirm(scope.row.id)"
              type="text"
              v-if="hasPermissionToDestroy"
            >
              <app-i18n code="common.destroy"></app-i18n>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="el-pagination-wrapper">
      <el-pagination
        :current-page="pagination.currentPage || 1"
        :disabled="loading"
        :layout="paginationLayout"
        :total="count"
        @current-change="doChangePaginationCurrentPage"
        @size-change="doChangePaginationPageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { OrderModel } from '@/modules/order/order-model';
import { mapGetters, mapActions } from 'vuex';
import { OrderPermissions } from '@/modules/order/order-permissions';
import { i18n } from '@/i18n';

const { fields } = OrderModel;

export default {
  name: 'app-order-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'order/list/rows',
      count: 'order/list/count',
      loading: 'order/list/loading',
      pagination: 'order/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      destroyLoading: 'order/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new OrderPermissions(this.currentUser).edit;
    },

    hasPermissionToDestroy() {
      return new OrderPermissions(this.currentUser).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'order/list/doChangeSort',
      doChangePaginationCurrentPage:
        'order/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'order/list/doChangePaginationPageSize',
      doMountTable: 'order/list/doMountTable',
      doDestroy: 'order/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return OrderModel.presenter(row, fieldName);
    },

    async doDestroyWithConfirm(id) {
      try {
        await this.$confirm(
          i18n('common.areYouSure'),
          i18n('common.confirm'),
          {
            confirmButtonText: i18n('common.yes'),
            cancelButtonText: i18n('common.no'),
            type: 'warning',
          },
        );

        return this.doDestroy(id);
      } catch (error) {
        // no
      }
    },
  },
};
</script>

<style>
</style>
