<template>
  <div class="top-warp">
    <div v-show="showSelectWords" class="select-words">
      {{ t('gsEditor.words') }}:{{ selectWords }}
    </div>
    <el-button type="primary" :icon="Search" @click.stop="emits('replace')">{{t('common.search')}}</el-button>
    <el-button type="primary" :icon="UploadFilled" @click.stop="emits('save')">{{ t('common.save') }}</el-button>
    <!-- 帮助弹层 -->
    <MpHelpDialog>
      <template #default>
        <el-button :icon="HelpFilled">{{ t('common.help') }}</el-button>
      </template>
    </MpHelpDialog>

  </div>
</template>

<script lang="ts" setup>
import MpHelpDialog from './mpHelpDialog.vue'
import { Search, UploadFilled, HelpFilled } from '@element-plus/icons-vue';
import { defineEmits, defineProps } from 'vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n()
const emits = defineEmits([ 'save', 'replace'])

const props = defineProps({
  showSelectWords: Boolean,
  selectWords: Number,
  titleList: {
    type: Array,
    default: () => []
  }
})

</script>

<style lang="less" scoped>
.top-warp {
  box-sizing: border-box;
  width: 100%;
  padding: 5px 10px;
  display: grid;
  grid-template-columns: 80px 80px 80px auto;
  grid-column-gap: 10px;
  justify-content: end;
  box-shadow: 0 2px 4px #ced1d5;
  background-color: #FFFFFF;
  border-radius: 5px;
  margin: 0 auto 10px;
  align-items: center;
  position: relative;

  .select-words {
    border-radius: 5px;
    position: absolute;
    left: 5px;
    background-color: #888888;
    background-color: rgba(50, 50, 50, 0.5);
    padding: 6px 15px;
    color: #ffffff;
    top: 5px;
  }
}
</style>
