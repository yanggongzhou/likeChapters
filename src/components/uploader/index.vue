<template>
  <el-upload
    action="#"
    :before-upload="beforeUpload"
    accept="image/*"
    :http-request="toUpload"
    :show-file-list="false"
  >
    <slot></slot>
  </el-upload>
</template>

<script setup lang="ts">
import { ElNotification } from 'element-plus';
import { UploadImg } from '@/api/bookCenter';
import { defineEmits, ref } from 'vue'
import { useI18n } from "vue-i18n";
const emits = defineEmits(['upload'])
const { t } = useI18n();
const isAllow = ref(true)
const beforeUpload = async (file: File) => {
  isAllow.value = true;
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    ElNotification.error(t('common.uploadImgMsg'));
    isAllow.value = false;
    return false;
  }
  return isLt1M;
}

const toUpload = async ({ file }: { file: File}) => {
  if (isAllow.value) {
    const formData = new FormData()
    formData.append('img', file)
    const { url } = await UploadImg(formData)
    emits('upload', url)
  }
}

</script>
