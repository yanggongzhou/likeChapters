<template>
  <div class="edit-scene-wrap">
    <span>Scene</span>
    <el-input v-model="modelValue" @focusout="focusout"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, watch } from "vue";
import { EditorModule } from "@/store/modules/editor";
import { EditNode } from "@/api/editor";

const modelValue = ref('');

onBeforeMount(() => {
  modelValue.value = EditorModule.nodeItem?.sceneContent || '';
})

watch(() => EditorModule.nodeItem, () => {
  modelValue.value = EditorModule.nodeItem?.sceneContent || '';
}, { deep: true })

const focusout = async () => {
  if (modelValue.value === EditorModule.nodeItem?.sceneContent) return;
  const { id, bookId, chapterId, sceneNum } = EditorModule.nodeItem;
  await EditNode({ id, bookId, chapterId, sceneNum, sceneContent: modelValue.value });
  await EditorModule.Init({ bookId, chapterId })
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
  padding: 15px 30px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  span {
    margin-right: 20px;
  }
  /deep/.el-input__wrapper {
    box-shadow: none;
  }
  /deep/.el-input__inner {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
