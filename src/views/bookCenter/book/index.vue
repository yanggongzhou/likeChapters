<template>
  <div class="book-wrap">
    <div class="book-title-container">
      <div class="book-title">
        <div class="title">
          {{ t('book.bookManagement') }}
        </div>
        <el-button class="title_btn" type="primary" size="large" @click="createBook">{{ t('book.createBook') }}</el-button>
      </div>
    </div>
    <BookList
      v-if="!isShowEmpty"
      v-load="loading"
      :list="bookList"
      @delete="bookDelete"
    />
    <el-empty :description="t('common.noData')" v-else>
      <el-button type="primary" round @click="createBook">{{ t('book.createBook') }}</el-button>
    </el-empty>
  </div>
</template>
<script lang="ts" setup>
import BookList from './bookList.vue'
import { IBookListItem } from '@/views/bookCenter/book/index.model';
import { onMounted, ref } from 'vue'
import { DeleteBook, ListBook } from '@/api/bookCenter';
import { useI18n } from "vue-i18n";
import router from "@/router";

const { t } = useI18n();
const bookList = ref<IBookListItem[]>([])
const loading = ref(false)
const isShowEmpty = ref(false)

const createBook = () => {
  router.push('/bookEdit')
}

const getBookList = async () => {
  loading.value = true
  isShowEmpty.value = false;
  const data = await ListBook()
  if (data.length > 0) {
    bookList.value = data;
  } else {
    isShowEmpty.value = true;
  }
  loading.value = false
}

const bookDelete = async (id: number) => {
  await DeleteBook(id);
  await getBookList()
}

onMounted(() => {
  getBookList()
})

</script>
<style lang="less" scoped>
.book-wrap {
  margin: 20px;
  height: calc(100% - 40px);

  .book-title-container {
    .book-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      .title {
        font-size: 22px;
        font-weight: bold;
      }

      .title_btn {
        border-radius: 40px;
      }
    }
  }
}
</style>
