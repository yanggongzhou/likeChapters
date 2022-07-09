<template>
  <div v-if="visible" class="type-menu"
       :style="'top:' + elPosition.top + 'px;' + 'left:' + elPosition.left + 'px;'">
    <p @click="emits('selectType', item)" v-for="item in typeList" :key="item">
      {{item}}</p>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const props = defineProps({
  visible: Boolean,
  elPosition: Object,
  typeList: Array,
})

const emits = defineEmits(['selectType'])

</script>

<style lang="less" scoped>
.type-menu {
  position: fixed;
  background-color: #ffffff;
  border-radius: 8px;
  max-height: 200px;
  width: 140px;
  font-size: 12px;
  overflow-y: auto;
  box-shadow: 0 1px 4px #ced1d5;
  padding: 5px;
  counter-reset: chapter 0;
  p {
    padding: 10px 15px;
    border-bottom: 1px dashed #bbbbbb;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    &::before {
      content: counter(chapter)'. ';
      counter-increment: chapter;
      position: relative;
      left: -5px;
    }
  }

  p:hover {
    background-color: #dddddd;
  }
}
</style>
