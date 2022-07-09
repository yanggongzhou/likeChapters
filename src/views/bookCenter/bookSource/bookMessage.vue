<template>
  <div class="book-message">
    <div class="book-message-content">
      <div class="card-item_tools">
        <el-icon v-waves @click.stop="bookEdit(bookDetail.id)">
          <edit></edit>
        </el-icon>
      </div>
      <div class="card-body">
        <el-image
            :src="bookDetail.bookCover"
            :fit="'cover'"
            class="image"
        >
          <template #error>
            <div class="image-slot">
              <el-icon>
                <picture-filled/>
              </el-icon>
            </div>
          </template>
        </el-image>
        <div class="card-content">
          <h4>{{ bookDetail.bookName }}</h4>
          <p>{{ bookDetail.bookIntro }}</p>
          <div class="bottom">
            <span>{{ t('common.createTime') }}: {{ formatTime(bookDetail.ctime) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import { dayjs } from "element-plus";

const router = useRouter();
const { t } = useI18n()
defineProps({
  bookDetail: {
    type: Object,
    required: true
  }
})

const formatTime = (val?: number): string => {
  return val ? dayjs(val).format('YYYY.MM.DD HH:mm:ss') : ''
}
const bookEdit = (bookId: string | number) => {
  router.push({ path: '/bookEdit', query: { bookId } })
}

</script>

<style lang="less" scoped>
.book-message {
  background-color: #ffffff;
  box-shadow: 0 1px 4px #00152914;
  border-radius: 10px;

  .book-message-content {
    margin: 20px;
    height: calc(100% - 40px);

    position: relative;

    .card-item_tools {
      opacity: 0;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      transition: opacity .3s;

      /deep/ .el-icon {
        cursor: pointer;
        padding: 5px;
        transition: background-color .3s;
        border-radius: 3px;

        &:hover {
          background-color: #70707038;
        }
      }
    }

    &:hover .card-item_tools {
      opacity: 1;
    }

    .card-body {
      display: flex;
      align-items: center;
      justify-items: center;

      .image {
        width: 100px;
        height: 160px;

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

      .card-content {
        flex: 1;
        padding: 0 20px;
        box-sizing: border-box;
        height: 160px;

        h4 {
          margin: 0 0 20px;
        }

        p {
          font-size: 14px;
          min-height: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5; /* 2行 */
          -webkit-box-orient: vertical;
          margin-bottom: 25px;
        }

        .bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
        }
      }
    }
  }
}

</style>
