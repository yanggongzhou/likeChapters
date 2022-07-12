<template>
  <div class="list-avatar-warp">
    <el-avatar v-if="!dataSource" :size="50"
               :src="'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'">
    </el-avatar>
    <div v-else class="avatarBox">
      <img :src="materialVOSItem.backext" alt="">
      <img :src="materialVOSItem.skin" alt="">
      <img :src="materialVOSItem.cloth" alt="">
      <img :src="materialVOSItem.emotion" alt="">
      <img :src="materialVOSItem.hair" alt="">
    </div>
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
.list-avatar-warp {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  //box-shadow: 0 0 2px 1px #9191fd;
  .avatarBox {
    width: 150px;
    position: absolute;
    top: 282px;
    left: -46px;

    img {
      width: 100%;
      position: absolute;
      bottom: 0;
    }
  }
}


</style>
