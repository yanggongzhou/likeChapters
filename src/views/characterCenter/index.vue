<template>
  <div class="character-center">
    <div class="preview">
      <EditMaterialDialog></EditMaterialDialog>
      <Preview></Preview>
    </div>
    <ClothStyle v-if="!isShowStyleManagement" :dataSource="dataSource" @onSave="onSave" @onCancel="onCancel"></ClothStyle>
    <div class="item-style-management" v-else>
      <StyleManagement :characterId="characterId"></StyleManagement>
    </div>
  </div>
</template>

<script lang="ts" setup>
import EditMaterialDialog from "@/views/characterCenter/editMaterial";
import StyleManagement from './styleManagement/styleManagement.vue'
import ClothStyle from './clothStyle/clothStyle.vue'
import Preview from './preview/preview.vue'
import { AddCharacterLook, EditCharacterLook } from '@/api/characterCenter.ts';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from "vue-router";
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { EBoolean } from "@/interfaces/common.interfaces";
import { ListMaterial } from "@/api/material";
import { MaterialTypeEnum } from "@/interfaces/material.interfaces";

const route = useRoute()
const dataSource = ref()
const characterId = computed(() => route.query.characterId as string)

const isShowStyleManagement = computed(() => CharacterCenterModule.isShowStyleManagement)

const onCancel = () => {
  CharacterCenterModule.SetIsShowStyleManagement(true)
  if (Array.isArray(CharacterCenterModule.characterDetail.styles) && CharacterCenterModule.characterDetail.styles.length > 0) {
    CharacterCenterModule.ReplaceStyleItem(CharacterCenterModule.characterDetail.styles[0]);
  }
}

const onSave = async () => {
  const { id } = CharacterCenterModule.dressUpItem
  if (id) {
    await EditCharacterLook({
      id: characterId.value,
      dressUpItem: {
        ...CharacterCenterModule.dressUpItem,
        isDefault: CharacterCenterModule.characterDetail.dressUp?.length > 0 ? EBoolean.no : EBoolean.yes,
      }
    })
  } else {
    await AddCharacterLook({
      id: characterId.value,
      dressUpItem: {
        ...CharacterCenterModule.dressUpItem,
        isDefault: CharacterCenterModule.characterDetail.dressUp?.length > 0 ? EBoolean.no : EBoolean.yes,
      }
    })
  }
  CharacterCenterModule.SetIsShowStyleManagement(true)
  getCharacterDetail()
}

const getMaterialList = async () => {
  dataSource.value = await ListMaterial({ materialType: MaterialTypeEnum.look })
}

onMounted(() => {
  getMaterialList()
  getCharacterDetail()
})

const getCharacterDetail = () => {
  CharacterCenterModule.SetCharacterDetail({ characterId: characterId.value, isMounted: true })
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
    position: relative;
  }
}
</style>
