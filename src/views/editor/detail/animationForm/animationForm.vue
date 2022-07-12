<template>
  <el-form :model="animationForm" :rules="rules" ref="animationFormRef" label-width="80px" class="form-content" size="small">
    <el-form-item :label="'表情'" prop="expression">
      <el-select
        v-model="animationForm.expression"
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
    <el-form-item :label="'动作'" prop="region">
      <el-select
        v-model="animationForm.action"
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
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, PropType, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { ElForm } from "element-plus";

const { t } = useI18n();
const props = defineProps({
  form: Object
})
const animationFormRef = ref(ElForm)
const rules = reactive({})

const animationForm = ref({} as any)

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
  animationForm.value = value;
})

onMounted(() => {
  animationForm.value = props.form;
})
const onConfirm = () => {
  if (!animationFormRef.value) return;
  animationFormRef.value.validate(async (valid: any) => {
    if (valid) {
      emits('confirm', animationForm.value)
    }
  })
}
</script>

<style lang="less" scoped>
.form-content {
  /deep/ .el-form-item {
    margin-bottom: 10px;
  }
}
</style>
