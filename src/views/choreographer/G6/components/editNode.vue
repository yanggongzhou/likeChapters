<template>
  <DzDialog
      :visible="visible"
      :width="'500px'"
      @close="emits('close')"
      @confirm="onConfirm"
      :confirmText="nodeForm.id ? t('common.save') : t('common.create')"
  >
    <template #title>
      <div class="dialog-header">
        {{ t('g6.nodeEdit') }}
      </div>
    </template>
    <el-form :model="nodeForm" :rules="rules" ref="nodeFormRef" label-width="120px" class="form-content">
      <el-form-item :label="t('g6.nodeName')" prop="nodeName">
        <el-input
            v-model="nodeForm.nodeName"
            :placeholder="t('g6.nodeName')"
            show-word-limit
            :maxlength="50"
            clearable
        />
      </el-form-item>
      <el-form-item :label="t('g6.nodeIntro')">
        <el-input
            v-model="nodeForm.nodeIntro"
            :placeholder="t('g6.nodeIntro')"
            show-word-limit
            :maxlength="50"
            clearable
        />
      </el-form-item>
    </el-form>
  </DzDialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, unref, PropType, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { ElForm } from "element-plus";
import { EBoolean } from "@/interfaces/common.interfaces";

export interface INodeForm {
  id: string | number;
  previousNodeId: string | number;
  bookId: string | number;
  chapterId: string | number;
  startNode: EBoolean;
  nodeName: string;
  nodeIntro?: string;
  content: string;
  totalNum?: number;
}

const { t } = useI18n()
const props = defineProps({
  visible: Boolean,
  form: Object as PropType<INodeForm>
})
const nodeFormRef = ref(ElForm)
const rules = reactive({
})

const nodeForm = ref<INodeForm>({} as INodeForm)

const emits = defineEmits([ 'close', 'confirm' ])

watch(() => props.form, (value) => {
  nodeForm.value = value as INodeForm;
})
onMounted(() => {
  nodeForm.value = props.form as INodeForm;
})
const onConfirm = () => {
  if (!nodeFormRef.value) {
    return;
  }
  const form = unref(nodeFormRef)

  form.validate(async (valid: any) => {
    if (valid) {
      emits('confirm', nodeForm.value)
    }
  })
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

  /deep/ .el-input--suffix .el-input__inner {
    padding: 0 20px;
    box-shadow: none;
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
