<template>
  <div class="choice-look-box" @click.stop>
    <div class="choice-control">
      <img @click="emits('left')" class="c-left" src="../../../assets/spImg/left.png" alt="">
      <img @click="emits('right')" class="c-right" src="../../../assets/spImg/left.png" alt="">
    </div>
    <div class="content">
      <div class="title">Choice(2/2)</div>
      <div class="choose">
        Choose your look
        <el-button class="choose_btn" icon="CaretBottom" size="small" style="color: #fff; width: 25px;" color="#b14379" round/>
      </div>
    </div>
    <el-button style="color: #fff; width: 40%" color="#b14379" round @click.stop="emits('confirm', roleName)">Confirm</el-button>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref, defineProps } from "vue";

const props = defineProps({

})
const emits = defineEmits(['confirm', 'left', 'right'])
const roleName = ref('')

</script>

<style lang="less" scoped>
.choice-look-box {
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
  .choice-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 60px;
    img {
      height: 30px;
      cursor: pointer;
    }
    .c-right {
      transform: rotate(180deg);
    }
  }
  .content {
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
    .choose {
      background-color: #fffefea3;
      height: 65px;
      text-align: center;
      line-height: 65px;
      border-radius: 10px;
      position: relative;
      font-style: italic;
      font-weight: 500;

      .choose_btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
  }
}
</style>
