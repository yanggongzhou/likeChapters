<template>
  <div class="cloth-item" :class="{isActive:isChecked, 'cloth-item_small': size === 'small', 'cloth-item_large': size === 'large'}">
    <el-image
        :src="url"
        :fit="'cover'"
        class="front-cover">
    </el-image>
    <div class="is-checked" v-show="isChecked">
      <el-icon><star-filled /></el-icon>
    </div>
    <div class="is-hover">
      select
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from "vue";
defineProps({
  url: String,
  isChecked: Boolean,
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  }
})
</script>

<style lang="less" scoped>
.cloth-item {
  cursor: pointer;
  width: 200px;
  height: 300px;
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid transparent;
  margin: 0 10px 10px 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  .front-cover {
    height: 100%;
  }
  .is-checked {
    position: absolute;
    bottom: -3px;
    right: -5px;
    z-index: 9;
    height: 30px;
    width: 35px;
    background-color: #9191fd;
    border-radius: 31px 0 0 0;
    font-size: 20px;
    color: #fff;
    font-weight: 800;
    line-height: 37px;
  }
  .is-hover {
    background-color: #9191fd75;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    text-align: center;
    line-height: 27px;
    height: 27px;
    position: absolute;
    bottom: 0;
    z-index: 10;
    width: 100%;
    opacity: 0;
    transition: opacity .3s;
  }
  &:hover .is-hover {
    opacity: 1;
  }
}

.cloth-item_small {
  width: 150px;
  height: 150px;
  overflow: hidden;
  .front-cover {
    width: 300px;
    position: absolute;
    top: -55px;
    left: -73px;
    height: auto;
  }
}

.cloth-item_large {
  width: 150px;
  height: 200px;
  overflow: hidden;
  .front-cover {
    height: 100%;
    width: 100%;
    position: static;
  }
}

.isActive {
  border: 2px solid #9191fd;
}
</style>
