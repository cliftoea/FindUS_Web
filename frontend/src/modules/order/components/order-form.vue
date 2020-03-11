<template>
  <div>
    <el-form
      :label-position="labelPosition"
      :label-width="labelWidthForm"
      :model="model"
      :rules="rules"
      @submit.native.prevent="doSubmit"
      class="form"
      ref="form"
      v-if="model"
    >
      <el-form-item :label="fields.id.label" :prop="fields.id.name" v-if="isEditing">
        <el-col :lg="11" :md="16" :sm="24">
          <el-input :disabled="true" v-model="model[fields.id.name]" />
        </el-col>
      </el-form-item>
              <el-form-item
          :label="fields.customer.label"
          :prop="fields.customer.name"
          :required="fields.customer.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-customer-autocomplete-input
              :fetchFn="fields.customer.fetchFn"
              :mapperFn="fields.customer.mapperFn"
              :showCreate="!modal"
              v-model="model[fields.customer.name]"
              mode="single"
            ></app-customer-autocomplete-input>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.products.label"
          :prop="fields.products.name"
          :required="fields.products.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-product-autocomplete-input
              :fetchFn="fields.products.fetchFn"
              :mapperFn="fields.products.mapperFn"
              :showCreate="!modal"
              v-model="model[fields.products.name]"
              mode="multiple"
            ></app-product-autocomplete-input>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.employee.label"
          :prop="fields.employee.name"
          :required="fields.employee.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-iam-user-autocomplete-input
              :fetchFn="fields.employee.fetchFn"
              :mapperFn="fields.employee.mapperFn"
              :showCreate="!modal"
              v-model="model[fields.employee.name]"
              mode="single"
            ></app-iam-user-autocomplete-input>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.delivered.label"
          :prop="fields.delivered.name"
          :required="fields.delivered.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-switch v-model="model[fields.delivered.name]"></el-switch>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.attachments.label"
          :prop="fields.attachments.name"
          :required="fields.attachments.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-file-upload
              :max="fields.attachments.max"
              :path="fields.attachments.path"
              :schema="fields.attachments.fileSchema"
              v-model="model[fields.attachments.name]"
            ></app-file-upload>
          </el-col>
        </el-form-item>
      <el-form-item>
        <div class="form-buttons">
          <el-button
            :disabled="saveLoading"
            @click="doSubmit"
            icon="el-icon-fa-floppy-o"
            type="primary"
          >
            <app-i18n code="common.save"></app-i18n>
          </el-button>

          <el-button :disabled="saveLoading" @click="doReset" icon="el-icon-fa-undo">
            <app-i18n code="common.reset"></app-i18n>
          </el-button>

          <el-button :disabled="saveLoading" @click="doCancel" icon="el-icon-fa-close">
            <app-i18n code="common.cancel"></app-i18n>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { FormSchema } from '@/shared/form/form-schema';
import { OrderModel } from '@/modules/order/order-model';

const { fields } = OrderModel;
const formSchema = new FormSchema([
  fields.id,
  fields.customer,
  fields.products,
  fields.employee,
  fields.delivered,
  fields.attachments,
]);

export default {
  name: 'app-order-form',

  props: ['isEditing', 'record', 'saveLoading', 'modal'],

  data() {
    return {
      rules: formSchema.rules(),
      model: null,
    };
  },

  created() {
    this.model = formSchema.initialValues(
      this.record || {},
    );
  },

  computed: {
    ...mapGetters({
      labelPosition: 'layout/labelPosition',
      labelWidthForm: 'layout/labelWidthForm',
    }),

    fields() {
      return fields;
    },
  },

  methods: {
    doReset() {
      this.model = formSchema.initialValues(this.record);
    },

    doCancel() {
      this.$emit('cancel');
    },

    async doSubmit() {
      try {
        await this.$refs.form.validate();
      } catch (error) {
        return;
      }

      const { id, ...values } = formSchema.cast(this.model);

      return this.$emit('submit', {
        id,
        values,
      });
    },
  },
};
</script>

<style>
</style>
