<template>
  <div class="book-list-scroll">
    <div class="book-list-warp">
      <el-card class="card-item" :body-style="{ padding: '30px 20px' }" v-for="val in list" :key="val.id" @click.stop="bookSource(val.id)">
          <div class="card-item_tools">
            <el-icon v-waves @click.stop="bookEdit(val.id)">
              <edit></edit>
            </el-icon>
            <el-icon v-waves :color="'red'" @click.stop="bookDelete(val.id)">
              <delete />
            </el-icon>
          </div>
          <div class="card-body">
            <el-image
                :src="val.bookCover"
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
              <h4>{{ val.bookName }}</h4>
              <p>{{ val.bookIntro }}</p>
              <div class="bottom">
                <span>{{ t('common.createTime') }}：{{ formatTime(val.ctime) }}</span>
              </div>
            </div>
          </div>
        </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { IBookListItem } from '@/views/bookCenter/book/index.model';
import { PropType, defineProps, defineEmits } from 'vue';
import { dayjs, ElMessageBox } from 'element-plus';
import router from '@/router';
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const formatTime = (val?: number): string => {
  return val ? dayjs(val).format('YYYY.MM.DD HH:mm:ss') : ''
}

defineProps({
  list: {
    type: Array as PropType<IBookListItem[]>,
    required: true
  }
})
const emits = defineEmits(['delete'])

const bookEdit = (bookId: string) => {
  router.push({ path: '/bookEdit', query: { bookId } })
}

const bookSource = (bookId: string) => {
  router.push({ path: '/bookSource', query: { bookId } })
}
const bookDelete = (id: string) => {
  ElMessageBox.confirm(
    'This action will permanently delete the file. Continue?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(() => {
    emits('delete', id)
  })
}

</script>

<style lang="less" scoped>
.book-list-scroll {
  height: calc(100% - 127px);
  box-sizing: border-box;
  overflow-y: auto;
}
.book-list-warp {
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  .card-item {
    border-radius: 10px;
    cursor: pointer;
    border: none;
    box-shadow: 0 0 4px gainsboro;
    position: relative;
    .card-item_tools {
      opacity: 0;
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 1;
      font-size: 20px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      transition: opacity .3s;
      /deep/.el-icon {
        cursor: pointer;
        padding: 5px;
        transition: background-color .3s;
        border-radius: 3px;
        &:hover {
          background-color: #70707038;
        }
      }
    }
    &:hover .card-item_tools{
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
