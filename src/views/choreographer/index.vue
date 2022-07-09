<!--编导主界面-->
<template>
  <div class="choreographer-wrap">
    <ChoreographerDetail></ChoreographerDetail>
    <ChoreographerG6></ChoreographerG6>
  </div>
</template>

<script lang="ts" setup>
import ChoreographerDetail from '@/views/choreographer/detail/index.vue'
import ChoreographerG6 from '@/views/choreographer/G6/index.vue'
import { computed, onMounted } from "vue";
import { ChoreographerModule } from "@/store/modules/choreographer";
import { useRoute } from "vue-router";

const route = useRoute();
const bookId = computed(() => route.query.bookId as string);
const chapterId = computed(() => route.query.chapterId as string);

onMounted(async () => {
  await ChoreographerModule.GetChapterList({ bookId: bookId.value, chapterId: chapterId.value });
})
</script>

<style lang="less" scoped>
.choreographer-wrap {
  height: 100%;
  box-shadow: 0 1px 4px #00152914;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 300px auto;
  grid-column-gap: 10px;
}
</style>
