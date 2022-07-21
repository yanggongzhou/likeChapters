<template>
  <div class="edit-scene-wrap">
    <div class="back-to-scene" v-if="isBranch === '1'">
      <el-icon v-waves @click="goBack">
        <arrow-left-bold/>
      </el-icon>
    </div>
    <span>Scene</span>
    <el-input v-model="modelValue" @focusout="focusout"></el-input>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref, watch } from "vue";
import { EditorModule } from "@/store/modules/editor";
import { EditNode } from "@/api/editor";
import { useRoute, useRouter } from "vue-router";

const modelValue = ref('');
const route = useRoute();
const router = useRouter();
const isBranch = computed(() => route.query.isBranch as string);

onBeforeMount(() => {
  modelValue.value = EditorModule.nodeItem?.sceneContent || '';
})

watch(() => EditorModule.nodeItem, () => {
  modelValue.value = EditorModule.nodeItem?.sceneContent || '';
}, { deep: true })

const goBack = () => {
  router.replace({ name: 'editor', query: { ...route.query, isBranch: 0 } });
}

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
  .back-to-scene {
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin-right: 20px;
  }
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
