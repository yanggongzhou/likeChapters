<template>
  <div class="editor-content-wrap">
    content
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);

</script>

<style lang="less" scoped>
.editor-content-wrap {

}
</style>
