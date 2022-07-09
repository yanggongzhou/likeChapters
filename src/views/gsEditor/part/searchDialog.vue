<template>
  <!-- 查询/替换 -->
  <div class="search-dialog" v-if="visible">
    <el-button class="search-dialog_close" size="small" @click.stop="emits('cancel')" type="text">X</el-button>
    <div class="but">
      <el-input type="text" @input="emits('changeText')" :placeholder="t('common.search')" v-model="searchValue"></el-input>
      <el-input type="text" :placeholder="t('common.replace')" v-model="replaceValue" />
    </div>
    <div style="margin-top: 10px">
      <el-button type="primary" size="small" round @click.stop="emits('determine', searchValue)">{{t('common.search')}}</el-button>
      <el-button type="primary" size="small" round @click.stop="emits('replaceFn', searchValue, replaceValue)">{{t('common.replace')}}</el-button>
      <el-button type="primary" size="small" round @click.stop="emits('replaceAll', searchValue, replaceValue)">{{t('gsEditor.replaceAll')}}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, watch, ref } from 'vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  },
})

const searchValue = ref('')
const replaceValue = ref('')

watch(() => props.visible, () => {
  searchValue.value = ''
  replaceValue.value = ''
})

const emits = defineEmits(['cancel', 'determine', 'replaceFn', 'replaceAll', 'changeText'])

</script>

<style lang="less" scoped>
.search-dialog {
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow: 0 1px 4px #00152914;
  width: 670px;
  margin: 0 auto;
  box-sizing: border-box;
  background-color: #f7f9fb;
  padding: 10px;
  border-radius: 5px;
  z-index: 99;
  border: 1px solid #ddddfe;
  text-align: right;
  //display: flex;
  //align-items: center;
  //justify-content: center;
  .search-dialog_close {
    position: absolute;
    top: 3px;
    right: 7px;
  }

  .but {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /deep/ .el-input__inner {
      width: 300px;
    }
  }
}

</style>
