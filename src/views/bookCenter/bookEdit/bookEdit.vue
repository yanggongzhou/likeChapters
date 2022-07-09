<template>
  <div class="new-book-warp">
    <div class="new-book_title">
      <span>{{ t('book.newBookTitle') }}</span>
      <el-button type="primary" class="submit_btn" @click="onSubmit" :loading="saveLoading">
        {{ t('common.save') }}
      </el-button>
    </div>
    <div class="new-book">
      <div class="new-book_content">
        <el-form :model="bookForm" :rules="rules" ref="bookFormRef" label-width="120px" class="form-content">
          <el-form-item :label="t('book.bookName')" prop="bookName">
            <el-input
              v-model="bookForm.bookName"
              :placeholder="t('book.bookName')"
              show-word-limit
              :maxlength="50"
              clearable
            />
          </el-form-item>
          <el-form-item :label="t('book.bookIntro')">
            <el-input
              v-model="bookForm.bookIntro"
              :autosize="{ minRows: 10, maxRows: 16 }"
              type="textarea"
              show-word-limit
              :maxlength="500"
              :placeholder="t('book.bookIntro')"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="new-book_upload">
        <el-image
          :src="bookForm.bookCover"
          :fit="'cover'"
          class="front-cover"
        >
          <template #error>
            <div class="image-slot">
              <el-icon>
                <picture-filled/>
              </el-icon>
            </div>
          </template>
        </el-image>
        <div class="upload-action">
          <Uploader @upload="getUploadUrl">
            <el-button  class="upload-action_btn">{{ t('book.uploadACover') }}</el-button>
          </Uploader>

          <div class="upload-instruct" v-html="t('book.uploadMessage')"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import Uploader from '@/components/uploader/index.vue'
import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { AddBook, DetailBook, EditBook } from '@/api/bookCenter';
import { FormInstance } from '@/main';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { t } = useI18n();
const bookFormRef = ref<FormInstance>()
const bookForm = reactive({
  bookName: '',
  bookIntro: '',
  bookCover: ''
})

const bookId = ref<string>()
const saveLoading = ref<boolean>(false)

const rules = reactive({
  bookName: [{ required: true, message: () => t('book.bookNameRuleMsg'), trigger: 'blur' }]
})

onMounted(async () => {
  const id = route.query.bookId
  if (id) {
    bookId.value = id as string;
    const { bookName, bookIntro, bookCover } = await DetailBook(id as string);
    bookForm.bookName = bookName;
    bookForm.bookIntro = bookIntro;
    bookForm.bookCover = bookCover;
  }
});

const getUploadUrl = (url: string) => {
  bookForm.bookCover = url
}

const onSubmit = () => {
  if (!bookFormRef.value) {
    return;
  }
  bookFormRef.value.validate(async (valid) => {
    if (valid) {
      saveLoading.value = true
      if (bookId.value) {
        await EditBook({
          id: bookId.value,
          bookName: bookForm.bookName,
          bookIntro: bookForm.bookIntro,
          bookCover: bookForm.bookCover
        })
        await router.back()
      } else {
        const { id } = await AddBook({
          bookName: bookForm.bookName,
          bookIntro: bookForm.bookIntro,
          bookCover: bookForm.bookCover
        })
        await router.push({ path: '/editBook', query: { id } })
      }
      saveLoading.value = false
    } else {
      return false;
    }
  });
}

</script>

<style lang="less" scoped>
.new-book-warp {
  height: 100%;
  box-shadow: 0 1px 4px #00152914;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;

  .new-book_title {
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;

    .submit_btn {
      font-size: 16px;
      width: 200px;
      height: 45px;
      border-radius: 23px;
    }
  }

  .new-book {
    overflow-y: auto;
    display: grid;
    height: calc(100% - 105px);
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 40px;
  }

  .new-book_content {
    height: 100%;

    .form-content {
      /deep/ .el-form-item {
        margin-bottom: 24px;
      }
      /deep/ .el-input__wrapper:hover {
        box-shadow: none;
      }
      /deep/ .el-input--suffix .el-input__inner {
        padding: 0 20px;
        box-shadow: none;
        background-color: #f1f1f1;
        border-radius: 10px;
      }

      /deep/ .el-textarea__inner {
        box-shadow: none;
        padding: 10px 20px;
        background-color: #f1f1f1;
        border-radius: 10px;
      }

      /deep/ .el-input .el-input__count .el-input__count-inner {
        background-color: #f1f1f1;
      }

      /deep/ .el-textarea .el-input__count {
        background-color: #f1f1f1;
      }
    }
  }

  .new-book_upload {
    display: grid;
    grid-template-columns: 300px auto;
    grid-column-gap: 15px;

    .front-cover {
      width: 300px;
      height: 500px;

      .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #f5f7fa;
        color: var(--el-text-color-secondary);
        font-size: 30px;
      }
    }

    .upload-action {
      text-align: center;

      .upload-action_btn {
        width: 300px;
        height: 45px;
        border-radius: 23px;
        border: 1px solid #9191fd;
        color: #9191fd;
        font-size: 16px;

        &:hover, &:focus {
          background-color: #9191fd14;
        }
      }

      .upload-instruct {
        text-align: left;
        font-size: 13px;
        line-height: 20px;
        color: #5c5b5b;
        margin: 40px 0;
      }
    }
  }
}
</style>
