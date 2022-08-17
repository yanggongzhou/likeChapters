<template>
  <div class="others-wrap">
    <el-tooltip
      class="box-item"
      effect="dark"
      content="背景"
      placement="top"
    >
      <img src="../../../assets/img/bg.png" alt="" @click.stop="emits('chooseBg')">
    </el-tooltip>
    <el-tooltip
      class="box-item"
      effect="dark"
      content="背景音乐"
      placement="top"
    >
      <img src="../../../assets/img/bgm.png" alt="" @click.stop="emits('chooseBgm')">
    </el-tooltip>

  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue";
const emits = defineEmits(['chooseBg', 'chooseBgm', 'chooseLink']);
</script>

<style lang="less" scoped>
.others-wrap {

  img {
    padding: 0 10px;
    cursor: pointer;
    width: 30px;
  }
}
</style>
