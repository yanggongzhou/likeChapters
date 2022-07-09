<template>
  <div class="book-center">
    <HomeNav></HomeNav>
    <div class="book-content">
      <BookItem v-if="activeName === HomeNavActiveType.authorCenter"></BookItem>
      <div v-if="activeName === HomeNavActiveType.materialCenter">
         待完成。。。
        <StoryPreview/>
      </div>
      <ChoBook v-if="activeName === HomeNavActiveType.choreographerCenter"></ChoBook>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ChoBook from '@/views/bookCenter/choBook/choBook.vue'
import StoryPreview from '@/views/storyPreview/index.vue'
import BookItem from './book/index.vue'
import HomeNav from '@/components/homeNav/index.vue'
import { AppModule } from '@/store/modules/app';
import { HomeNavActiveType } from '@/store/modules/index.model';
import { computed } from 'vue';

const activeName = computed(() => AppModule.homeNavActive)

</script>

<style lang="less" scoped>
.book-center {
  display: grid;
  grid-template-columns: 340px auto;
  grid-column-gap: 25px;
  height: 100%;

  .book-content {
    box-shadow: 0 1px 4px #00152914;
    border-radius: 10px;
    background-color: #ffffff;
    min-height: 600px;
  }
}
</style>
