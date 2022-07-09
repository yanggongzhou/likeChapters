<template>
  <div class="select-name-box" @click.stop>
    <div class="select-name_content">
      <div class="title">Select your name</div>
      <el-input v-model="roleName"/>
    </div>
    <el-button style="color: #fff; width: 40%" color="#b14379" round @click.stop="emits('ok', roleName)">OK</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, defineProps } from "vue";

const props = defineProps({

})
const emits = defineEmits(['ok'])
const roleName = ref('')

</script>

<style lang="less" scoped>
.select-name-box {
  min-height: 100px;
  box-shadow: 0 1px 4px #00152914;
  position: absolute;
  width: 100%;
  left: 0;
  top: calc(50% - 20px);
  z-index: 999;
  box-sizing: border-box;
  text-align: center;
  padding: 0 20px;

  .select-name_content {
    background: #b14379bd;
    margin-bottom: 10px;
    padding: 8px;
    border-radius: 10px;
    .title {
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      margin-bottom: 6px;
    }
    /deep/ .el-input__inner {
      height: 60px;
      font-size: 14px;
      font-weight: 600;
      text-align: center;
    }
  }
}
</style>
