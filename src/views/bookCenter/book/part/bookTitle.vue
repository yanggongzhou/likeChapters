<template>
  <div class="book-title-container">
    <div class="book-title">
      <div class="title">
        {{ t('book.bookManagement') }}
      </div>
      <el-button class="title_btn" type="primary" size="large" @click="createBook">{{ t('book.createBook') }}</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import router from '@/router';

const { t } = useI18n()

const createBook = () => {
  router.push('/bookEdit')
}

</script>
<style lang="less" scoped>
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
</style>
