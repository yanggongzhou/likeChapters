<template>
  <el-dialog
      custom-class="dz-dialog-warp"
      :model-value="visible"
      :width="width"
      top="18vh"
      @close="handleClose"
      :append-to-body="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="showClose"
      :destroy-on-close="destroyOnClose"
      draggable
  >
    <template #title>
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose" size="large" round>{{ t('common.cancel') }}</el-button>
        <el-button type="primary" size="large" @click="handleConfirm" round>{{ confirmText }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineProps({
  visible: {
    type: Boolean,
    default: false,
    required: true
  },
  width: String,
  destroyOnClose: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
  }
})
const emits = defineEmits([ 'close', 'confirm' ])
const handleClose = () => {
  emits('close')
}
const handleConfirm = () => {
  emits('confirm')
}
</script>

<style lang="less" scoped>
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 270px;
  /deep/ .el-button {
    width: 120px
  }
}
</style>
<style>
.dz-dialog-warp {
  border-radius: 10px;
}

.dz-dialog-warp .el-dialog__footer {
  position: absolute;
  bottom: -72px;
  right: -15px;
}

.dz-dialog-warp .el-dialog__body {
  padding: 20px;
}
</style>
