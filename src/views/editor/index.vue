<!--编导主界面-->
<template>
  <div class="editor-wrap">
    <div class="editor-preview">
      <AvatarPreview></AvatarPreview>
    </div>
    <div class="editor-content">
      <EditorContent></EditorContent>
    </div>
    <div class="editor-right">
      <EditorRight></EditorRight>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditorContent from '@/views/editor/content/index.vue'
import AvatarPreview from '@/views/characterCenter/preview/preview.vue'
import EditorRight from '@/views/editor/right/right.vue'
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { EditorModule } from "@/store/modules/editor";

const route = useRoute();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);

onMounted(async () => {
  await EditorModule.Init({ bookId: bookId.value, chapterId: chapterId.value })
})
</script>

<style lang="less" scoped>
.editor-wrap {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 400px auto 400px;
  grid-column-gap: 25px;

  .editor-preview {
    position: relative;
    box-shadow: 0 1px 4px #00152914;
    border-radius: 10px;
    background-color: #ffffff;
  }
  .editor-right {
    position: relative;
  }
}
</style>
