<template>
  <el-popover
      v-model:visible="showHelpDialog"
      placement="bottom"
      :width="200">
    <template #reference>
      <div @click.stop="showHelpDialog = !showHelpDialog">
        <slot></slot>
      </div>
    </template>
    <template #default>
      <div class="mp-help-dialog" :class="visible && 'show-help'">
        <p class="title">{{ t('help.title1') }}</p>
        <div>
          <p>1.1 {{ t('help.scene') }}</p>
          <p>1.2 {{ t('help.narration') }}</p>
          <p>1.3 {{ t('help.character') }}</p>
          <p>1.4 {{ t('help.expression') }}</p>
          <p>1.5 {{ t('help.dialogue') }} </p>
          <p>1.6 {{ t('help.monologue') }}</p>
        </div>
        <p class="title">{{ t('help.title2') }}</p>
        <p>{{ t('help.text1') }}</p>
        <p>{{ t('help.text2') }}</p>
        <p>{{ t('help.text3') }}</p>
      </div>
    </template>
  </el-popover>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
const showHelpDialog = ref(false) // 是否显示帮助弹层
const { t } = useI18n();
</script>

<style scoped lang="less">
.mp-help-dialog {
  width: 200px;
  padding: 10px;
  box-sizing: border-box;

  .title {
    font-size: 14px;
    font-weight: bold;
  }

  p {
    font-size: 12px;
    margin-bottom: 10px;
  }
}

.show-help {
  right: 0;
  transition: all 0.5s linear;
}
</style>
