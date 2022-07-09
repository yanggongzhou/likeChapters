<template>
  <div class="chapter-warp">
    <div class="chapter-list">
      <div class="title">
        {{ t('bookSource.chapterList') }}
      </div>
      <DzTable
        :maxHeight="tableMaxHeight"
        :showIndex="false"
        :data="chapterData.chapterList"
        :columns="chapterColumns"
        @columnClick="columnClick"
      >
        <template #chapterIntro="scope">
          {{ scope.row.chapterIntro || '-' }}
        </template>
        <template #ctime="scope">
          <ElIcon class="mr-3">
            <Timer/>
          </ElIcon>
          {{ dayjs(scope.row.ctime).format('YYYY.MM.DD') }}
        </template>
        <template #operations="scope">
          <el-button size="small" type="primary" @click.stop="editChapter(scope.row)">{{ t('common.edit') }}</el-button>
          <el-button size="small" @click.stop="goChoreographer(scope.row)">编导</el-button>
        </template>
      </DzTable>

    </div>

    <div class="foot-create" @click="createChapter">
      <el-icon>
        <CirclePlusFilled/>
      </el-icon>
      <span class="text">{{ t('bookSource.createChapter') }}</span>
    </div>

    <EditChapterDialog
        :visible="visible"
        @close="visible = false"
        @confirm="onConfirm"
        :form="chapterForm"

    ></EditChapterDialog>
  </div>
</template>

<script lang="ts" setup>
import EditChapterDialog from './editChapter.vue'
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { computed, onMounted, reactive, ref } from 'vue';
import {
  AddChapter,
  EditChapter,
  ListChapter,
} from '@/api/bookCenter';
import { ICustomTableColumn } from "@/components/table/index.vue";
import { debounce } from "lodash";
import { dayjs } from "element-plus";
import { IChapterParams } from "@/interfaces/chapter.interfaces";
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const visible = ref<boolean>(false)
const bookId = computed(() => route.query?.bookId)
const columnClick = (row: IChapterParams, property: string) => {
  if (property === 'chapterName' || property === 'chapterIntro') {
    const { id, bookId } = row
    router.push({ name: 'editor', query: { bookId, chapterId: id } })
  }
}

const chapterColumns: ICustomTableColumn[] = [
  {
    prop: 'chapterName',
    label: t('bookSource.chapterTitle'),
    width: 180,
  },
  {
    prop: 'chapterIntro',
    label: t('bookSource.chapterDescription'),
    slot: true
  },
  {
    prop: 'ctime',
    label: t('common.createTime'),
    slot: true
  },
  {
    prop: 'operations',
    label: t('common.operation'),
    width: 220,
    slot: true
  },
]

const createChapter = () => {
  visible.value = true
  chapterForm.id = void 0
  chapterForm.bookId = bookId.value as string
  chapterForm.chapterName = ''
  chapterForm.chapterIntro = ''
}
const editChapter = (row: IChapterParams) => {
  visible.value = true
  chapterForm.id = row.id
  chapterForm.bookId = bookId.value as string
  chapterForm.chapterName = row.chapterName
  chapterForm.chapterIntro = row.chapterIntro || ''
}
const chapterForm = reactive<IChapterParams>({
  id: void 0,
  chapterName: '',
  chapterIntro: ''
})

const onConfirm = async (characterForm: IChapterParams) => {
  visible.value = false;
  if (characterForm.id) {
    await EditChapter({ ...characterForm, bookId: bookId.value as string })
  } else {
    await AddChapter({ ...characterForm, bookId: bookId.value as string })
  }
  await chapterData.getListChapter()
}

const chapterData = reactive({
  chapterList: [],
  getListChapter: async () => {
    const { bookId } = route.query
    chapterData.chapterList = await ListChapter(bookId as string);
  }
})

const goChoreographer = (row: any) => {
  const { id, bookId } = row
  router.push({ name: 'choreographer', query: { bookId, chapterId: id } })
}

onMounted(() => {
  chapterData.getListChapter()
  resizeDom()
  window.addEventListener('resize', resizeDom)
})

const tableMaxHeight = ref(284); // 表格最大高度

const resizeDom = debounce(() => {
  tableMaxHeight.value = (document.querySelector('.chapter-list') as any).clientHeight - 100 || 284
}, 300)

</script>

<style lang="less" scoped>
.chapter-warp {
  background-color: #ffffff;
  box-shadow: 0 1px 4px #00152914;
  border-radius: 10px;
  position: relative;

  .chapter-list {
    margin: 20px;
    height: calc(100% - 40px);
    overflow-y: auto;

    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 20px;
    }

  }

  .foot-create {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    box-shadow: 0 -2px 4px #00152914;
    font-size: 35px;
    color: #a5a5fa;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .5s;
    cursor: pointer;

    .text {
      font-size: 16px;
      margin: 8px 0 0 8px;
      font-weight: 500;
    }

    &:hover {
      color: #9191fd;
    }
  }
}
</style>
