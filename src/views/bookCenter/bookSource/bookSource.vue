<template>
  <div class="book-edit-warp">
    <div class="book-edit_content">
      <CharacterList></CharacterList>
      <div class="book-warp">
        <BookMessage :bookDetail="bookDetail"></BookMessage>
        <ChapterList></ChapterList>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import CharacterList from './characterList/characterList.vue'
import BookMessage from './bookMessage.vue'
import ChapterList from './chapterList/chapterList.vue'
import { onMounted, reactive } from 'vue';
import { DetailBook } from '@/api/bookCenter';
import { useRoute } from 'vue-router';

const route = useRoute()
const bookDetail = reactive({
  id: '',
  bookName: '',
  bookIntro: '',
  bookCover: '',
  ctime: '',
  author: '',
  getDetail: async (id: string) => {
    const { bookName, bookIntro, bookCover, ctime, author } = await DetailBook(id);
    bookDetail.id = id;
    bookDetail.bookName = bookName;
    bookDetail.bookIntro = bookIntro;
    bookDetail.bookCover = bookCover;
    bookDetail.ctime = ctime;
    bookDetail.author = author;
  }
})

onMounted(async () => {
  const { bookId } = route.query
  if (bookId) {
    await bookDetail.getDetail(bookId as string)
  }
});

</script>

<style lang="less" scoped>
.book-edit-warp {
  height: 100%;

  .book-edit_content {
    height: 100%;
    display: grid;
    grid-template-columns: 400px auto;
    grid-column-gap: 25px;

    .book-warp {
      display: grid;
      grid-template-rows: 200px auto;
      grid-row-gap: 25px;
    }
  }

}
</style>
