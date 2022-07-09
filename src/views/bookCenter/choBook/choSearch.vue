<template>
  <div class="new-book-warp">
    <el-form :model="bookSearch" inline label-width="80px" class="form-content">
      <el-form-item :label="t('book.bookName')">
        <el-input
          v-model="bookSearch.bookName"
          :placeholder="t('book.bookName')"
          :maxlength="50"
          clearable
        />
      </el-form-item>
      <el-form-item :label="'书籍ID'">
        <el-input
          v-model="bookSearch.bookId"
          :maxlength="50"
          :placeholder="'书籍ID'"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">{{ t('common.search') }}</el-button>
        <el-button type="primary" @click="onReset">{{ t('common.reset') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { IBookSearch } from "@/views/bookCenter/choBook/index.model";

const router = useRouter();
const route = useRoute();
const emits = defineEmits(['onSearch', 'onReset'])
const { t } = useI18n();

const bookSearch = reactive<IBookSearch>({
  bookName: '',
  bookId: '',
})

const onSearch = () => {
  emits('onSearch', bookSearch)
}

const onReset = () => {
  bookSearch.bookName = '';
  bookSearch.bookId = '';
  emits('onSearch', bookSearch)
}
</script>

<style lang="less" scoped></style>
