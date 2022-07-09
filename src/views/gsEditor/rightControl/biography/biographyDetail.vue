<template>
  <DzDialog
      :visible="visible"
      :width="'600px'"
      @close="emits('close')"
      @confirm="onConfirm"
      :confirmText="t('common.save')"
      :destroy-on-close="true"
  >
    <template #title>
      <div class="dialog-header">
        {{ t('gsEditor.scenes') }}
      </div>
    </template>
    <WangEditor
        :isEditor="isEditor"
        v-load="loading"
        v-model="editorContent"
        @customUploadImg="insertImg"></WangEditor>
  </DzDialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, nextTick, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { ElNotification } from "element-plus";
import { UploadImg } from "@/api/bookCenter";
import WangEditor from '@/components/wangEditor.vue'

const loading = ref(false)
const { t } = useI18n()
const props = defineProps({
  visible: Boolean,
  content: String,
})
const isEditor = ref(true)
const editorContent = ref('');

watch(() => props.content, async (value) => {
  isEditor.value = true;
  editorContent.value = value
  await nextTick(() => {
    isEditor.value = false;
  })
})

onMounted(async () => {
  isEditor.value = true;
  editorContent.value = props.content
  await nextTick(() => {
    isEditor.value = false;
  })
})

const emits = defineEmits([ 'close', 'confirm' ])

const onConfirm = () => {
  emits('confirm', editorContent.value)
}
// 插入图片
const insertImg = async ({ resultFiles, insertImgFn }: { resultFiles: File[], insertImgFn: (url: string) => void }) => {
  loading.value = true
  const file = resultFiles[0]
  const fileSize = file.size
  if (fileSize > 1024 * 1024) {
    ElNotification({
      title: t('common.uploadImgMsg'),
      type: 'error'
    })
    loading.value = false
    return
  }
  const formData = new FormData()
  formData.append('img', file)
  const { url } = await UploadImg(formData);
  // 插入图片,图片地址
  insertImgFn(url)
  loading.value = false;
}
</script>

<style lang="less" scoped>
.dialog-header {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}
</style>
