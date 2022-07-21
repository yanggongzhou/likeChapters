<template>
  <div class="editor-content-wrap">
    <SceneDetail/>
    <!--分支-->
    <div v-if="isBranch === '1' && activeNodeId">
      <BranchContent
        :branch-data="branchData"
        :book-id="bookId"
        :chapter-id="chapterId"
        :node-id="activeNodeId"
        :characterList="characterList"
        @refresh="refreshData"
      />
    </div>
    <!--场景-->
    <div v-if="isBranch !== '1'">
      <template v-for="val in sceneList" :key="val.id">
        <MessageDetail
          v-if="[TemplateTypeEnum.对话, TemplateTypeEnum.旁白, TemplateTypeEnum.内心独白].indexOf(val.type) !== -1"
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
      <BranchTag
        v-if="branchData"
        :branch-data="branchData"
        @goToBranch="goToBranch"
        @refresh="refreshData"/>
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
import { TemplateTypeEnum } from "@/interfaces/editor.interfaces";
import { AddBranch } from "@/api/editor";
import { SceneItemDto } from "@/utils/resultModule";

const route = useRoute();
const router = useRouter();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);
const isBranch = computed(() => route.query.isBranch as string);
const characterList = ref<ICharacterListItem[]>([])
const sceneList = computed(() => EditorModule.nodeItem.sceneList);
const activeNodeId = computed(() => EditorModule.activeNodeId as string);
const addVisible = ref(false);
const branchData = computed(() =>
  EditorModule.nodeItem.sceneList
    ?.find(val =>
      [TemplateTypeEnum.对话分支, TemplateTypeEnum.对话分支].indexOf(val.type) !== -1)
)

onBeforeMount(async () => {
  characterList.value = await ListCharacter(bookId.value)
})

const refreshData = async () => {
  await EditorModule.Init({ bookId: bookId.value, chapterId: chapterId.value });
  EditorModule.SetActiveNodeId(activeNodeId.value);
}

// 添加消息框
const addMessage = () => {
  addVisible.value = true;
}

// 添加选择项
const addChoice = async () => {
  console.log('添加选择项', route.query)
  await AddBranch(new SceneItemDto({
    bookId: bookId.value,
    chapterId: chapterId.value,
    nodeId: activeNodeId.value,
    type: TemplateTypeEnum.对话分支,
    content: ''
  }))
  await refreshData();
}
const goToBranch = () => {
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
