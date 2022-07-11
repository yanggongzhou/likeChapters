<template>
  <div class="cloth-type">
    <el-tabs @tab-click="handleClick">
      <el-tab-pane v-for="val in bodyData" :key="val.label" :label="val.label" :name="val.name">
        <ClothItem
          v-for="three in threeData"
          :url="three.materialUrl"
          :key="three.id"
          :size="'default'"
          @click="selectThreeData(three)"/>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script lang="ts" setup>
import ClothItem from './clothItem.vue'
import { computed } from "vue";
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { TabsPaneContext } from "element-plus";
import { LookTypeEnum } from "@/interfaces/material.interfaces";

const bodyData = [
  { name: LookTypeEnum.skin, label: 'skin' },
  { name: LookTypeEnum.cloth, label: 'cloth' },
  { name: LookTypeEnum.emotion, label: 'emotion' },
  { name: LookTypeEnum.hair, label: 'hair' },
  { name: LookTypeEnum.backext, label: 'backext' }
]

const threeData = computed(() => {
  return CharacterCenterModule.materialVOS.filter((mater: any) => {
    return !mater.materialFourType;
  })
})

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  CharacterCenterModule.SetLookType(tab.props.name as LookTypeEnum)
}

// SetMaterialType
const onSelect = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)

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
