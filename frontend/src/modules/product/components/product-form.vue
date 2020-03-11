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
          :label="fields.name.label"
          :prop="fields.name.name"
          :required="fields.name.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input v-model="model[fields.name.name]" ref="focus" />
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.description.label"
          :prop="fields.description.name"
          :required="fields.description.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input :rows="4" type="textarea" v-model="model[fields.description.name]" />
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.unitPrice.label"
          :prop="fields.unitPrice.name"
          :required="fields.unitPrice.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <el-input-number :precision="fields.unitPrice.scale" :step="0.1" v-model="model[fields.unitPrice.name]" ></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item
          :label="fields.photos.label"
          :prop="fields.photos.name"
          :required="fields.photos.required"
        >
          <el-col :lg="11" :md="16" :sm="24">
            <app-image-upload
              :max="fields.photos.max"
              :path="fields.photos.path"
              :schema="fields.photos.fileSchema"
              v-model="model[fields.photos.name]"
            ></app-image-upload>
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
import { ProductModel } from '@/modules/product/product-model';

const { fields } = ProductModel;
const formSchema = new FormSchema([
  fields.id,
  fields.name,
  fields.description,
  fields.unitPrice,
  fields.photos,
]);

export default {
  name: 'app-product-form',

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
