<template>
  <div class="character-center">
    <div class="preview">
      <Preview></Preview>
    </div>
    <ClothStyle v-if="!isShowStyleManagement" :dataSource="dataSource" @onSave="onSave" @onCancel="onCancel"></ClothStyle>
    <div class="item-style-management" v-else>
      <StyleManagement></StyleManagement>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StyleManagement from './styleManagement/styleManagement.vue'
import ClothStyle from './clothStyle/clothStyle.vue'
import Preview from './preview/preview.vue'
import { AddStyle, EditStyle, ListClothStyle } from '@/api/characterCenter.ts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { EBoolean } from "@/interfaces/common.interfaces";

const route = useRoute()
const dataSource = ref()

const isShowStyleManagement = computed(() => CharacterCenterModule.isShowStyleManagement)

const onCancel = () => {
  CharacterCenterModule.SetIsShowStyleManagement(true)
  if (Array.isArray(CharacterCenterModule.characterDetail.styles) && CharacterCenterModule.characterDetail.styles.length > 0) {
    CharacterCenterModule.ReplaceStyleItem(CharacterCenterModule.characterDetail.styles[0]);
  }
}

const onSave = async () => {
  const { id } = CharacterCenterModule.selectStyleItem
  if (id) {
    await EditStyle({
      id,
      biographyId: route.query.characterId as string,
      material: getMaterialId() as string,
      styleName: 'Default Style',
      defaultStyle: CharacterCenterModule.characterDetail.styles.length > 0 ? EBoolean.no : EBoolean.yes
    })
  } else {
    await AddStyle({
      biographyId: route.query.characterId as string,
      material: getMaterialId() as string,
      styleName: 'Default Style',
      defaultStyle: CharacterCenterModule.characterDetail.styles.length > 0 ? EBoolean.no : EBoolean.yes
    })
  }
  CharacterCenterModule.SetIsShowStyleManagement(true)
  getCharacterDetail()
}

const getMaterialId = () => {
  const ids = CharacterCenterModule.selectStyleItem.materialVOS.map(val => val.id);
  return ids.join(',');
}

const getClothStyleList = async () => {
  const { materialVOS } = await ListClothStyle()
  dataSource.value = materialVOS
}

onMounted(() => {
  getClothStyleList()
  getCharacterDetail()
})

const getCharacterDetail = () => {
  const { characterId = '' } = route.query
  if (characterId) {
    CharacterCenterModule.SetCharacterDetail({ characterId, isMounted: true } as {characterId: string, isMounted: boolean})
  }
}

onUnmounted(() => {
  CharacterCenterModule.ResetCharacterCenter()
})

</script>

<style lang="less" scoped>
.character-center {
  height: 100%;
  display: grid;
  grid-template-columns: 400px auto;
  grid-column-gap: 25px;

  .preview, .item-style-management {
    box-shadow: 0 1px 4px #00152914;
    border-radius: 10px;
    background-color: #ffffff;
  }
}
</style>
