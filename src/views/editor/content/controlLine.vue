<template>
  <div class="control-line-wrap">
    <i></i>
    <div class="control-line_content">
      <el-button size="small" @click.stop="emits('message')">消息</el-button>
      <el-button size="small" @click.stop="emits('choice')">choice</el-button>
      <el-button size="small" @click.stop="emits('link')">link</el-button>
    </div>
    <i></i>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
const emits = defineEmits(['message', 'choice', 'link']);
</script>

<style lang="less" scoped>
.control-line-wrap {
  width: 100%;
  font-size: 20px;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    flex: 1;
    display: inline-block;
    min-width: 200px;
    height: 3px;
    background-color: #9191fd;
    border-radius: 5px;
  }
  .control-line_content {
    width: 200px;
    text-align: center;
  }
}
</style>
