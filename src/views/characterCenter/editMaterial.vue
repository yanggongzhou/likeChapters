<template>
  <div class="edit-material-warp">
    <el-button size="small" @click="visible = true"> add</el-button>
    <DzDialog
      :visible="visible"
      :width="'500px'"
      @close="closeDialog"
      @confirm="onConfirm"
      :confirmText="t('common.create')"
    >
      <template #title>
        <div class="dialog-header">
          上传素材（临时）
        </div>
      </template>
      <el-form :model="materialForm" :rules="rules" ref="materialFormRef" label-width="150px" class="form-content">
        <el-form-item :label="'素材名称'">
          <el-input
            v-model="materialForm.materialName"
            show-word-limit
            :maxlength="50"
            clearable
          />
        </el-form-item>
        <el-form-item :label="'素材类型'">
          <el-select
            v-model="materialForm.materialType"
          >
            <el-option :label="MaterialTypeEnum.look" :value="MaterialTypeEnum.look"/>
            <el-option :label="MaterialTypeEnum.background" :value="MaterialTypeEnum.background"/>
            <el-option :label="MaterialTypeEnum.bgm" :value="MaterialTypeEnum.bgm"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="'装扮类型'">
          <el-select
            v-model="materialForm.lookType"
          >
            <el-option :label="LookTypeEnum.skin" :value="LookTypeEnum.skin"/>
            <el-option :label="LookTypeEnum.hair" :value="LookTypeEnum.hair"/>
            <el-option :label="LookTypeEnum.backext" :value="LookTypeEnum.backext"/>
            <el-option :label="LookTypeEnum.cloth" :value="LookTypeEnum.cloth"/>
            <el-option :label="LookTypeEnum.emotion" :value="LookTypeEnum.emotion"/>
          </el-select>
        </el-form-item>

        <el-form-item :label="'上传素材'">
          <Uploader @upload="getUploadUrl">
            <el-button  class="upload-action_btn">{{ t('book.uploadACover') }}</el-button>
          </Uploader>
        </el-form-item>

        <el-form-item :label="'预览'">
          <el-image
            :src="materialForm.materialUrl"
            :fit="'cover'"
            style="width: 200px; height: 200px;"
          >
            <template #error>
              <div class="image-slot">
                <el-icon>
                  <picture-filled/>
                </el-icon>
              </div>
            </template>
          </el-image>
        </el-form-item>
      </el-form>
    </DzDialog>
  </div>
</template>

<script lang="ts" setup>
import Uploader from '@/components/uploader/index.vue'
import { reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n';
import { FormInstance } from "@/main";
import { LookTypeEnum, MaterialTypeEnum } from "@/interfaces/material.interfaces";
import { AddMaterial } from "@/api/material";
import { ElMessage } from "element-plus";

const { t } = useI18n()
const visible = ref(false)

const getUploadUrl = (url: string) => {
  materialForm.materialUrl = url
}

const materialFormRef = ref<FormInstance>()

const materialForm = reactive({
  materialName: '',
  materialType: MaterialTypeEnum.look,
  lookType: LookTypeEnum.skin,
  materialUrl: ''
})

watch(() => visible.value, (val) => {
  if (val && materialFormRef.value) {
    (materialFormRef.value as FormInstance).resetFields();
  }
})
const rules = reactive({})

const onConfirm = () => {
  if (!materialFormRef.value) {
    return;
  }
  materialFormRef.value.validate(async (valid) => {
    if (valid) {
      await AddMaterial(materialForm)
      ElMessage.success('成了')
    }
  })
}
const closeDialog = () => {
  if (materialFormRef.value) {
    materialFormRef.value.resetFields()
  }
  visible.value = false
}
</script>

<style lang="less" scoped>
.edit-material-warp {
  position: absolute;
  top: 20px;
  right: 10px;
  z-index: 9999;
}
</style>
