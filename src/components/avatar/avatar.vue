<template>
  <div class="avatar" :style="{width: `${width}px`, height: `${width * 1.44}px`, left: `calc(50% - ${width/2}px)`}">
    <img :src="materialVOSItem.colorUrl" alt="">
    <img :src="materialVOSItem.clothingUrl" alt="">
    <img :src="materialVOSItem.faceTypeUrl" alt="">
    <img :src="materialVOSItem.hairStyleUrl" alt="">
    <img :src="materialVOSItem.accessoriesUrl" alt="">
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from "vue";
import { ClothTypeEnum, IStyles } from "@/store/modules/index.model";

const props = defineProps({
  width: Number,
  dataSource: {
    type: Object as PropType<IStyles>,
    required: true
  },
})

const materialVOSItem = computed(() => {
  const { materialVOS = [] } = props.dataSource
  let colorUrl = ''; let clothingUrl = ''; let faceTypeUrl = ''; let hairStyleUrl = ''; let accessoriesUrl = ''
  materialVOS.forEach(val => {
    if (val.materialType === ClothTypeEnum.skin) colorUrl = val.materialUrl;
    if (val.materialType === ClothTypeEnum.clothes) clothingUrl = val.materialUrl;
    if (val.materialType === ClothTypeEnum.faceType) faceTypeUrl = val.materialUrl;
    if (val.materialType === ClothTypeEnum.hair) hairStyleUrl = val.materialUrl;
    if (val.materialType === ClothTypeEnum.jewelry) accessoriesUrl = val.materialUrl;
  })

  return { colorUrl, clothingUrl, faceTypeUrl, hairStyleUrl, accessoriesUrl }
})
</script>

<style lang="less" scoped>
.avatar {
  width: 250px;
  position: absolute;
  bottom: 0;
  left: 84px;

  img {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
}

</style>
