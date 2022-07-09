<template>
  <DzDialog
      :visible="visible"
      :width="'600px'"
      @close="closeDialog"
      @confirm="onConfirm"
      :confirmText="form.id ? t('common.save') : t('common.create')"
  >
    <template #title>
      <div class="dialog-header">
        {{ t('bookSource.chapterDetails') }}
      </div>
    </template>
    <el-form :model="chapterForm" :rules="rules" ref="chapterFormRef" label-width="150px" class="form-content">
      <el-form-item :label="t('bookSource.chapterTitle')" prop="chapterName">
        <el-input
            v-model="chapterForm.chapterName"
            :placeholder="t('bookSource.chapterTitle')"
            show-word-limit
            :maxlength="50"
            clearable
        />
      </el-form-item>
      <el-form-item :label="t('bookSource.chapterDescription')">
        <el-input
            v-model="chapterForm.chapterIntro"
            :autosize="{ minRows: 10, maxRows: 16 }"
            type="textarea"
            show-word-limit
            :maxlength="500"
            :placeholder="t('bookSource.chapterDescription')"
        />
      </el-form-item>
    </el-form>
  </DzDialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, PropType, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { FormInstance } from "@/main";
import { IChapterParams } from "@/interfaces/chapter.interfaces";

const { t } = useI18n()
const props = defineProps({
  visible: Boolean,
  form: Object as PropType<IChapterParams>,
})
const chapterFormRef = ref<FormInstance>()

const chapterForm = ref({} as IChapterParams)
watch(() => props.form, (val) => {
  chapterForm.value = {} as IChapterParams;
  chapterForm.value = val as IChapterParams;
}, { deep: true })
watch(() => props.visible, (val) => {
  if (val && chapterFormRef.value) {
    (chapterFormRef.value as FormInstance).resetFields();
  }
})
const rules = reactive({
  chapterName: [ { required: true, message: () => t('bookSource.chapterTitleRuleMg'), trigger: 'blur' } ]
})

onMounted(() => {
  chapterForm.value = props.form as IChapterParams
})

const emits = defineEmits([ 'close', 'confirm' ])
const onConfirm = () => {
  if (!chapterFormRef.value) {
    return;
  }
  chapterFormRef.value.validate((valid) => {
    if (valid) {
      emits('confirm', chapterForm.value)
    }
  })
}
const closeDialog = () => {
  if (chapterFormRef.value) {
    chapterFormRef.value.resetFields()
  }
  emits('close')
}
</script>

<style lang="less" scoped>
.dialog-header {
  text-align: center;
  font-size: 16px;
  font-weight: 500;
}

.form-content {
  /deep/ .el-form-item {
    margin-bottom: 24px;
  }
  /deep/ .el-input__wrapper:hover {
    box-shadow: none;
  }
  /deep/ .el-input__wrapper {
    box-shadow: none !important;
  }
  /deep/ .el-input--suffix .el-input__inner {
    padding: 0 20px;
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  /deep/ .el-textarea__inner {
    box-shadow: none;
    padding: 10px 20px;
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  /deep/ .el-input .el-input__count .el-input__count-inner {
    background-color: #f1f1f1;
  }

  /deep/ .el-textarea .el-input__count {
    background-color: #f1f1f1;
  }
}
</style>
