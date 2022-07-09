<template>
  <div class="chobook-warp">
    <ChoSearch
      @onSearch="onSearch"
    />
    <el-divider style="margin: 10px 0"/>
    <DzTable
      :showIndex="false"
      :data="bookList"
      :columns="bookColumns"
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
      <template #bookCover="scope">
        <el-image :src="scope.row.bookCover" :fit="'cover'"/>
      </template>
      <template #operations="scope">
        <el-button size="small" type="primary" @click.stop="editBook(scope.row)">{{ t('common.edit') }}</el-button>
        <el-button size="small" @click.stop="goChapters(scope.row)">章节列表</el-button>
      </template>
    </DzTable>
  </div>

</template>
<script lang="ts" setup>
import ChoSearch from '@/views/bookCenter/choBook/choSearch.vue'
import { ICustomTableColumn } from "@/components/table/index.vue";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import { dayjs } from "element-plus";
import { IBookListItem } from "@/interfaces/book.interfaces";
import { DeleteBook, ListBook } from "@/api/bookCenter";
import { useRouter } from "vue-router";
import { IBookSearch } from "@/views/bookCenter/choBook/index.model";

const router = useRouter();
const { t } = useI18n()
const bookColumns: ICustomTableColumn[] = [
  { prop: 'id', label: 'ID', width: 60 },
  { prop: 'bookName', label: '书名' },
  { prop: 'author', label: '作者', width: 100 },
  { prop: 'status', label: '状态', width: 80 },
  { prop: 'chapterNum', label: '章节数', width: 80 },
  { prop: 'userId', label: '创建人员', width: 100 },
  { prop: 'ctime', label: t('common.createTime'), width: 180, slot: true },
  { prop: 'ctime', label: t('common.updateTime'), width: 180, slot: true },
  { prop: 'bookCover', label: '书籍封面', width: 100, slot: true },
  { prop: 'operations', label: t('common.operation'), width: 220, slot: true }
]

const bookList = ref<IBookListItem[]>([])
const loading = ref(false)

const createBook = () => {
  router.push('/bookEdit')
}

const onSearch = async (param: IBookSearch) => {
  console.log('onSearch------->', param);
  await getBookList(param)
}

const getBookList = async (param?: IBookSearch) => {
  loading.value = true
  const { books = [] } = await ListBook()
  bookList.value = books;
  loading.value = false
}

const bookDelete = async (id: number) => {
  await DeleteBook(id);
  await getBookList()
}

const editBook = (item: any) => {
  console.log(item)
}

const goChapters = (item: any) => {
  console.log(item)
}

onMounted(() => {
  getBookList()
})
</script>

<style lang="less" scoped>
.chobook-warp {
  height: 100%;
  box-shadow: 0 1px 4px #00152914;
  padding: 20px;
  box-sizing: border-box;
}
</style>
