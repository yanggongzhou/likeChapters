<template>
  <div class="material-center">
    <div class="preview">
      <Preview></Preview>
    </div>
    <RightControl/>
  </div>
</template>

<script lang="ts" setup>
import RightControl from './part/right.vue'
import Preview from '../characterCenter/preview/preview.vue'
</script>

<style lang="less" scoped>
.material-center {
  height: 100%;
  display: grid;
  grid-template-columns: 400px auto;
  grid-column-gap: 25px;

  .preview {
    box-shadow: 0 1px 4px #00152914;
    border-radius: 10px;
    background-color: #ffffff;
  }
}
</style>
