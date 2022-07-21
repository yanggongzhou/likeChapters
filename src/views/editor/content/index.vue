<template>
  <div class="editor-content-wrap">
    <SceneDetail/>
    <template v-for="val in sceneList" :key="val.id">
      <MessageDetail
        :sceneItem="val"
        :characterList="characterList"
      />
    </template>

    <ControlLine
      @message="addMessage"
      @choice="addChoice"
      @link="addLink"
    />
    <MessageAdd
      v-if="addVisible"
      :book-id="bookId"
      :chapter-id="chapterId"
      :node-id="activeNodeId"
      :characterList="characterList"
      @cancel="addVisible = false"/>

  </div>
</template>

<script lang="ts" setup>
import MessageAdd from '@/views/editor/content/messageAdd.vue'
import ControlLine from '@/views/editor/content/controlLine.vue'
import SceneDetail from '@/views/editor/content/sceneDetail.vue'
import MessageDetail from '@/views/editor/content/messageDetail.vue'
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { EditorModule } from "@/store/modules/editor";
import { ICharacterListItem } from "@/interfaces/character.interfaces";
import { ListCharacter } from "@/api/characterCenter";
import { ISceneItem } from "@/interfaces/editor.interfaces";

const route = useRoute();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);
const characterList = ref<ICharacterListItem[]>([])
const sceneList = computed(() => EditorModule.nodeItem.sceneList as ISceneItem[]);
const activeNodeId = computed(() => EditorModule.activeNodeId as string);
const addVisible = ref(false);

onBeforeMount(async () => {
  characterList.value = await ListCharacter(bookId.value)
})

// 添加消息框
const addMessage = () => {
  addVisible.value = true;
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
