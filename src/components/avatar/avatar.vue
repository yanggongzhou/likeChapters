<template>
  <div class="avatar" :style="{width: `${width}px`, height: `${width * 1.44}px`, left: `calc(50% - ${width/2}px)`}">
    <img :src="materialVOSItem.backext" alt="">
    <img :src="materialVOSItem.skin" alt="">
    <img :src="materialVOSItem.cloth" alt="">
    <img :src="materialVOSItem.emotion" alt="">
    <img :src="materialVOSItem.hair" alt="">
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, PropType } from "vue";
import { LookTypeEnum } from "@/interfaces/material.interfaces";
import { IDressUpItem } from "@/interfaces/character.interfaces";

const props = defineProps({
  width: Number,
  dataSource: {
    type: Object as PropType<IDressUpItem>,
    required: true
  },
})

const materialVOSItem = computed(() => ({
  skin: props.dataSource?.[LookTypeEnum[LookTypeEnum.skin]]?.url,
  cloth: props.dataSource?.[LookTypeEnum[LookTypeEnum.cloth]]?.url,
  emotion: props.dataSource?.[LookTypeEnum[LookTypeEnum.emotion]]?.url,
  hair: props.dataSource?.[LookTypeEnum[LookTypeEnum.hair]]?.url,
  backext: props.dataSource?.[LookTypeEnum[LookTypeEnum.backext]]?.url,
}))
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
