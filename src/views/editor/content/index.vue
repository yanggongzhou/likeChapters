<template>
  <div class="editor-content-wrap">
    <SceneDetail v-model="scene"/>
    <template v-for="val in sceneList" :key="val.id">
      <MessageDetail
        :sceneItem="val"
        :characterList="characterList"
      />
    </template>
    <MessageDetail
      :sceneItem="sceneItem"
      :characterList="characterList"
    />
    <ControlLine
      @message="addMessage"
      @choice="addChoice"
      @link="addLink"
    />
  </div>
</template>

<script lang="ts" setup>
import ControlLine from '@/views/editor/content/controlLine.vue'
import SceneDetail from '@/views/editor/content/sceneDetail.vue'
import MessageDetail from '@/views/editor/content/messageDetail.vue'
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { EditorModule } from "@/store/modules/editor";
import { SceneItemDto } from "@/utils/resultModule";
import { ICharacterListItem } from "@/interfaces/character.interfaces";
import { ListCharacter } from "@/api/characterCenter";
import { ISceneItem } from "@/interfaces/editor.interfaces";

const route = useRoute();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);
const characterList = ref<ICharacterListItem[]>([])
const sceneItem = computed(() => EditorModule.sceneItem);
const sceneList = computed(() => EditorModule.sceneList as ISceneItem[]);
const activeNodeId = computed(() => EditorModule.activeNodeId as string);

onBeforeMount(async () => {
  characterList.value = await ListCharacter(bookId.value)
})

const scene = ref('123')
// 添加消息框
const addMessage = () => {
  console.log('添加消息框')
  const params = new SceneItemDto({ bookId: bookId.value, chapterId: chapterId.value, nodeId: activeNodeId.value })
  EditorModule.SetSceneItem(params);
  console.log('sceneItem---------->', sceneItem.value)
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
  height: 100%;
  overflow: auto;
  position: relative;
}
</style>
