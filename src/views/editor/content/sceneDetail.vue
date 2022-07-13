<template>
  <div class="edit-scene-wrap">
    <span>Scene</span>
    <el-input :model-value="modelValue" @input="inputChange"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String
})

const emits = defineEmits(['update:modelValue']);

const inputChange = (value: string) => {
  emits('update:modelValue', value)
}

</script>

<style lang="less" scoped>
.edit-scene-wrap {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 4px #00152914;
  background-color: #FFFFFF;
  font-size: 20px;
  font-weight: 500;
  padding: 20px;
  box-sizing: border-box;
  height: 80px;
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
}
</style>
