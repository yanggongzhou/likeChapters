<template>
  <div class="cloth-type">
    <el-tabs v-model="bodyId" @tab-click="handleClick">
      <el-tab-pane v-for="val in bodyData" :key="val.id" :label="val.name" :name="val.id">
        <ClothItem
            v-for="three in threeData"
            :url="three.materialUrl"
            :key="three.id"
            :size="'default'"
            @click="selectThreeData(three)"/>

<!--        :isChecked="isChecked === three.materialUrl"-->

<!--        <el-tabs v-model="threeId" class="demo-tabs" @tab-click="onSelect">-->
<!--          <el-tab-pane v-for="three in val.threeTypes" :key="three.id" :label="three.name" :name="three.id"></el-tab-pane>-->
<!--        </el-tabs>-->

      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script lang="ts" setup>
import ClothItem from './clothItem.vue'
import { computed } from "vue";
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { ClothTypeEnum, MaterialTwoTypeEnum, MaterialTypeEnum } from "@/store/modules/index.model";
import { TabsPaneContext } from "element-plus";

const bodyData = computed(() => {
  return CharacterCenterModule.typeData.filter(val => val.name === MaterialTypeEnum.look)[0]?.typeTwos || []
})
const bodyId = computed(() => {
  if (bodyData.value.length > 0) {
    return bodyData.value.filter(val => val.name === MaterialTwoTypeEnum.body)[0].id;
  }
  return ''
})

const threeId = computed(() => {
  if (bodyData.value.length > 0) {
    return bodyData.value.filter(val => val.name === MaterialTwoTypeEnum.body)[0].id;
  }
  return ''
})

const threeData = computed(() => {
  return CharacterCenterModule.materialVOS.filter((mater: any) => {
    return !mater.materialFourType;
  })
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

// SetMaterialType
const onSelect = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  // CharacterCenterModule.SetClothType(Number(index) as unknown as ClothTypeEnum)
}

const selectThreeData = (three: any) => {
  console.log(three);
}

</script>

<style lang="less" scoped>
.cloth-type {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
</style>
