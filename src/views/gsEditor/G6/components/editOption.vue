<template>
  <DzDialog
      :visible="visible"
      :width="'500px'"
      @close="emits('close')"
      @confirm="onConfirm"
      :confirmText="optionForm.id ? t('common.save') : t('common.create')"
  >
    <template #title>
      <div class="dialog-header">
        {{ t('g6.optionDetail') }}
      </div>
    </template>
    <el-form :model="optionForm" :rules="rules" ref="optionFormRef" label-width="135px" class="form-content">
      <el-form-item :label="t('g6.optionIntro')" prop="biographyName">
        <el-input
            v-model="optionForm.content"
            :placeholder="t('g6.optionIntro')"
            show-word-limit
            :maxlength="50"
            clearable
        />
      </el-form-item>
      <el-form-item :label="t('g6.free')">
        <el-checkbox :true-label="EBoolean.yes" :false-label="EBoolean.no" v-model="optionForm.free"/>
      </el-form-item>
      <el-form-item :label="t('g6.diamond')" v-if="optionForm.free === EBoolean.no">
        <el-select v-model="optionForm.coin" :placeholder="t('g6.diamond')">
          <el-option
              v-for="item in diamondNumberList"
              :key="item"
              :label="item + t('g6.diamond')"
              :value="item"
          />
        </el-select>
      </el-form-item>

<!--      <el-form-item :label="'选项类型'">-->
<!--        <el-select v-model="optionForm.optionType" placeholder="请选择">-->
<!--          <el-option-->
<!--              v-for="item in optionTypeList"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
    </el-form>
  </DzDialog>
</template>

<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, unref, PropType, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { ElForm } from "element-plus";
import { TemplateTypeEnum } from "@/store/modules/result.model";
import { EBoolean } from "@/interfaces/common.interfaces";

export interface IOptionForm {
  id: string | number;
  content: string;
  bookId: string | number;
  chapterId: string | number;
  previousNodeId: string | number;
  nextNodeId: string | number;
  optionType: TemplateTypeEnum;
  free: EBoolean;
  coin?: number;
}

const { t } = useI18n()
const props = defineProps({
  visible: Boolean,
  form: Object as PropType<IOptionForm>
})
const optionFormRef = ref(ElForm)
const rules = reactive({
})
const diamondNumberList = [ 5, 8, 10, 16, 25 ] // 金币列表
const optionTypeList = [
  { label: '选项', value: TemplateTypeEnum.选项 },
  { label: '头发分支', value: TemplateTypeEnum.头发分支 },
  { label: '皮肤分支', value: TemplateTypeEnum.皮肤分支 },
  { label: '皮肤分支', value: TemplateTypeEnum.皮肤分支 },
]
const optionForm = ref<IOptionForm>({} as IOptionForm)

const emits = defineEmits([ 'close', 'confirm' ])

watch(() => props.form, (value) => {
  optionForm.value = value as IOptionForm;
})
watch(() => optionForm.value?.free, (val) => {
  console.log(val);
})

onMounted(() => {
  optionForm.value = props.form as IOptionForm;
})
const onConfirm = () => {
  if (!optionFormRef.value) {
    return;
  }
  const form = unref(optionFormRef)

  form.validate(async (valid: any) => {
    if (valid) {
      emits('confirm', optionForm.value)
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
