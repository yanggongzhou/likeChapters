<template>
  <div class="editor-content-wrap">
    content
    <EditScene v-model="scene"/>
    <ControlLine
      @message="addMessage"
      @choice="addChoice"
      @link="addLink"
    />
  </div>
</template>

<script lang="ts" setup>
import ControlLine from '@/views/editor/content/controlLine.vue'
import EditScene from '@/views/editor/content/editScene.vue'
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { EditorModule } from "@/store/modules/editor";

const route = useRoute();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);

const scene = ref('123')
// 添加消息框
const addMessage = () => {
  console.log('添加消息框')
  EditorModule.AddResult()
}
// 添加选择项
const addChoice = () => {
  console.log('添加选择项')
}
// 添加跳转
const addLink = () => {
  console.log('添加跳转')
}

</script>

<style lang="less" scoped>
.editor-content-wrap {

}
</style>
