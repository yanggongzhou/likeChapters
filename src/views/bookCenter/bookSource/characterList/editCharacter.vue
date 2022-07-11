<template>
  <DzDialog
      :visible="visible"
      :width="'700px'"
      @close="closeDialog"
      @confirm="onConfirm"
      :confirmText="form.id ? t('common.save') : t('common.create')"
  >
    <template #title>
      <div class="dialog-header">
        {{ t('bookSource.characterDetails') }}
      </div>
    </template>
    <div class="edit-character-content">

      <el-empty v-if="!selectStyleItem" :description="t('common.noData')"></el-empty>
      <div v-else class="preview-content">
        <Avatar :width="160" :dataSource="selectStyleItem"/>
      </div>
      <el-form :model="characterForm" :rules="rules" ref="characterFormRef" label-width="120px" class="form-content">
        <el-form-item :label="t('bookSource.characterName')" prop="biographyName">
          <el-input
              v-model="characterForm.characterName"
              :placeholder="t('bookSource.characterName')"
              show-word-limit
              :maxlength="50"
              clearable
          />
        </el-form-item>
        <el-form-item :label="t('bookSource.characterIntro')">
          <el-input
              v-model="characterForm.characterIntro"
              :autosize="{ minRows: 10, maxRows: 16 }"
              type="textarea"
              show-word-limit
              :maxlength="500"
              :placeholder="t('bookSource.characterIntro')"
          />
        </el-form-item>
        <el-form-item :label="t('bookSource.sex')">
          <el-radio-group v-model="characterForm.sex">
            <el-radio :label="SexType.boy">boy</el-radio>
            <el-radio :label="SexType.girl">girl</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="t('bookSource.mainCharacter')">
          <el-switch
              v-model="characterForm.mainCharacter"
              :active-value="EBoolean.yes"
              :inactive-value="EBoolean.no"
          />
        </el-form-item>
      </el-form>
    </div>
  </DzDialog>
</template>

<script lang="ts" setup>
import Avatar from '@/components/avatar/avatar.vue'
import { reactive, ref, defineProps, defineEmits, PropType, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n';
import { IStyles } from "@/store/modules/index.model";
import { EBoolean } from "@/interfaces/common.interfaces";
import { FormInstance } from "@/main";
import { ICharacterParams, SexType } from "@/interfaces/character.interfaces";
const { t } = useI18n()
const props = defineProps({
  visible: Boolean,
  form: Object as PropType<ICharacterParams>,
  selectStyleItem: Object as PropType<IStyles>
})
const emits = defineEmits([ 'close', 'confirm' ])
const characterFormRef = ref<FormInstance>()
const characterForm = ref({} as ICharacterParams)

watch(() => props.form, (val) => {
  characterForm.value = {} as ICharacterParams;
  characterForm.value = val as ICharacterParams;
}, { deep: true })

onMounted(() => {
  characterForm.value = props.form as ICharacterParams;
})

const rules = reactive({
  characterName: [ { required: true, message: () => t('bookSource.characterNameRuleMsg'), trigger: 'blur' } ]
})

const onConfirm = () => {
  if (!characterFormRef.value) {
    return;
  }
  characterFormRef.value.validate((valid) => {
    if (valid) {
      emits('confirm', characterForm.value)
    }
  })
}
const closeDialog = () => {
  if (characterFormRef.value) {
    characterFormRef.value.resetFields()
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

.edit-character-content {
  display: grid;
  grid-template-columns: 220px auto;
  grid-column-gap: 20px;
}

.preview-content {
  border-radius: 10px;
  height: 380px;
  box-shadow: 0 1px 4px #00152914;
  background: url("../../../../assets/img/default-scene.jpg") no-repeat;
  background-size: cover;
  background-position: 50% 100%;
  position: relative;
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
