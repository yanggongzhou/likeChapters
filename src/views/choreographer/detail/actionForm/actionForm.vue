<template>
  <el-form :model="actionForm" :rules="rules" ref="actionFormRef" label-width="80px" class="form-content" size="small">
    <el-form-item :label="'类型'" prop="region">
      <el-select
        v-model="actionForm.nodeName"
        placeholder="please select your zone"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item :label="'角色'" prop="region">
      <el-select
        v-model="actionForm.region"
        placeholder="please select your zone"
      >
        <el-option label="Zone one" value="shanghai"/>
        <el-option label="Zone two" value="beijing"/>
      </el-select>
    </el-form-item>
    <el-form-item :label="'进入方向'" prop="region">
      <el-select
        v-model="actionForm.region"
        placeholder="please select your zone"
      >
        <el-option label="Zone one" value="shanghai"/>
        <el-option label="Zone two" value="beijing"/>
      </el-select>
    </el-form-item>

    <el-form-item :label="'延时'" prop="num">
      <el-input-number
        v-model="actionForm.num"
        :min="0"
        :max="3000"
        size="small"
        controls-position="right"
      />
    </el-form-item>
    <el-form-item :label="'内容'" prop="num">
      <el-input
        v-model="actionForm.nodeName"
        :placeholder="t('g6.nodeName')"
        :maxlength="50"
        type="textarea"
      />
    </el-form-item>
    <el-form-item :label="t('g6.nodeName')" prop="nodeName">
      <el-input
        v-model="actionForm.nodeName"
        :placeholder="t('g6.nodeName')"
        :maxlength="50"
      />
    </el-form-item>
  </el-form>
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
  form: Object as PropType<INodeForm>
})
const actionFormRef = ref(ElForm)
const rules = reactive({})

const actionForm = ref<INodeForm>({} as INodeForm)

const emits = defineEmits(['close', 'confirm'])

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

watch(() => props.form, (value) => {
  actionForm.value = value as INodeForm;
})

onMounted(() => {
  actionForm.value = props.form as INodeForm;
})
const onConfirm = () => {
  if (!actionFormRef.value) return;
  actionFormRef.value.validate(async (valid: any) => {
    if (valid) {
      emits('confirm', actionForm.value)
    }
  })
}
</script>

<style lang="less" scoped>
.form-content {
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
  //
  ///deep/ .el-input--suffix .el-input__inner {
  //  padding: 0 20px;
  //  box-shadow: none;
  //  background-color: #f1f1f1;
  //  border-radius: 10px;
  //}
  //
  ///deep/ .el-textarea__inner {
  //  box-shadow: none;
  //  padding: 10px 20px;
  //  background-color: #f1f1f1;
  //  border-radius: 10px;
  //}
  //
  ///deep/ .el-input .el-input__count .el-input__count-inner {
  //  background-color: #f1f1f1;
  //}
  //
  ///deep/ .el-textarea .el-input__count {
  //  background-color: #f1f1f1;
  //}
}
</style>
