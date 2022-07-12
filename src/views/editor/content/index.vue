<template>
  <div class="editor-content-wrap">
    content
    <EditScene v-model="scene"/>
  </div>
</template>

<script lang="ts" setup>
import EditScene from '@/views/editor/content/editScene.vue'
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);

const scene = ref('123')

</script>

<style lang="less" scoped>
.editor-content-wrap {

}
</style>
