<template>
  <div class="biography-page">
    <div class="content-list">
      <div v-if="GSEditorModule.sceneList.length">
        <div class="content-list_item" v-for="item in GSEditorModule.sceneList" :key="item.id" @click="selectItem(item)">
          <p :class="biographyId === item.id && 'select-item'">{{ item.biographyName }}</p>
        </div>
      </div>
      <el-empty :description="t('common.noData')" v-else></el-empty>
    </div>
    <BiographyDetail
        :visible="visibleDetail"
        :content="editorContent"
        @confirm="saveText"
        @close="visibleDetail = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { useI18n } from "vue-i18n";
import { EditScene, IBiographyForm, IBiographyList } from "@/api/characterCenter";
import BiographyDetail from './biographyDetail.vue'
import { GSEditorModule } from "@/store/modules/gsEditor";

const visibleDetail = ref(false);

const route = useRoute()
const bookId = computed(() => route.query.bookId)
const chapterId = computed(() => route.query.chapterId)
const editorContent = ref<string>('')
const { t } = useI18n()

const biographyId = ref<string | number>('')
const dataList = computed(() => GSEditorModule.sceneList)

onMounted(async () => {
  await GSEditorModule.GetSceneList(bookId.value as string);
  if (dataList.value.length > 0) {
    const { id = '', biographyIntro = '' } = dataList.value[0]
    biographyId.value = id;
    editorContent.value = biographyIntro;
  }
})

const selectItem = (item: IBiographyList) => {
  biographyId.value = item.id;
  editorContent.value = item.biographyIntro || '';
  visibleDetail.value = true;
}

const saveText = async (intro: string) => {
  await EditScene({
    id: biographyId.value,
    bookId: bookId.value,
    biographyIntro: intro
  } as IBiographyForm)

  visibleDetail.value = false;
  ElNotification({
    title: t('common.saved'),
    message: '',
    type: 'success'
  })
  await GSEditorModule.GetSceneList(bookId.value as string);
}
</script>

<style src="./biography.less" lang="less" scoped></style>
