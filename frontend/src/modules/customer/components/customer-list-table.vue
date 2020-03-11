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

      <el-table-column
        :label="fields.name.label"
        :prop="fields.name.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'name') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.birthdate.label"
        :prop="fields.birthdate.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'birthdate') }}</template>
      </el-table-column>

      <el-table-column
        :label="fields.gender.label"
        :prop="fields.gender.name"
        sortable="custom"
      >
        <template slot-scope="scope">{{ presenter(scope.row, 'gender') }}</template>
      </el-table-column>

      <el-table-column :fixed="isMobile? undefined : 'right'" align="center" width="180">
        <template slot-scope="scope">
          <div class="table-actions">
            <router-link :to="`/customer/${scope.row.id}`">
              <el-button type="text">
                <app-i18n code="common.view"></app-i18n>
              </el-button>
            </router-link>

            <router-link :to="`/customer/${scope.row.id}/edit`" v-if="hasPermissionToEdit">
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
import { CustomerModel } from '@/modules/customer/customer-model';
import { mapGetters, mapActions } from 'vuex';
import { CustomerPermissions } from '@/modules/customer/customer-permissions';
import { i18n } from '@/i18n';

const { fields } = CustomerModel;

export default {
  name: 'app-customer-list-table',

  mounted() {
    this.doMountTable(this.$refs.table);
  },

  computed: {
    ...mapGetters({
      rows: 'customer/list/rows',
      count: 'customer/list/count',
      loading: 'customer/list/loading',
      pagination: 'customer/list/pagination',
      isMobile: 'layout/isMobile',
      currentUser: 'auth/currentUser',
      destroyLoading: 'customer/destroy/loading',
      paginationLayout: 'layout/paginationLayout',
    }),

    hasPermissionToEdit() {
      return new CustomerPermissions(this.currentUser).edit;
    },

    hasPermissionToDestroy() {
      return new CustomerPermissions(this.currentUser).destroy;
    },

    fields() {
      return fields;
    },
  },

  methods: {
    ...mapActions({
      doChangeSort: 'customer/list/doChangeSort',
      doChangePaginationCurrentPage:
        'customer/list/doChangePaginationCurrentPage',
      doChangePaginationPageSize:
        'customer/list/doChangePaginationPageSize',
      doMountTable: 'customer/list/doMountTable',
      doDestroy: 'customer/destroy/doDestroy',
    }),

    presenter(row, fieldName) {
      return CustomerModel.presenter(row, fieldName);
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
