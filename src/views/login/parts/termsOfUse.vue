<template>
  <el-dialog
    :model-value="visible"
    width="500px"
    top="18vh"
    @close="emits('close')"
    :append-to-body="true"
    :show-close="true"
    draggable
    center
  >
    <template #title>
      {{ t('login.terms') }}
    </template>
    <div class="terms-use">
      {{ t('login.termsDesc') }}
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';
import { useI18n } from "vue-i18n";
defineProps({
  visible: Boolean,
})
const { t } = useI18n();
const emits = defineEmits(['close'])
</script>
