<template>
  <div class="editor-content-wrap">
    <SceneDetail/>
    <!--分支-->
    <div v-if="isBranch === '1' && activeNodeId">
      <BranchContent
        :book-id="bookId"
        :chapter-id="chapterId"
        :node-id="activeNodeId"
        :characterList="characterList"
      />
    </div>
    <!--场景-->
    <div v-if="isBranch !== '1'">
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
      <BranchTag/>
    </div>

  </div>
</template>

<script lang="ts" setup>
import BranchContent from '@/views/editor/content/branch/index.vue'
import BranchTag from '@/views/editor/content/branchTag.vue'
import MessageAdd from '@/views/editor/content/messageAdd.vue'
import ControlLine from '@/views/editor/content/controlLine.vue'
import SceneDetail from '@/views/editor/content/sceneDetail.vue'
import MessageDetail from '@/views/editor/content/messageDetail.vue'
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { EditorModule } from "@/store/modules/editor";
import { ICharacterListItem } from "@/interfaces/character.interfaces";
import { ListCharacter } from "@/api/characterCenter";
import { ISceneItem } from "@/interfaces/editor.interfaces";

const route = useRoute();
const router = useRouter();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);
const isBranch = computed(() => route.query.isBranch as string);
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
  console.log('添加选择项', route.query)
  router.replace({ name: 'editor', query: { ...route.query, isBranch: 1 } });
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
