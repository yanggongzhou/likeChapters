<template>
  <div class="cloth-type">
    <el-tabs :model-value="lookType" @tab-click="handleClick">
      <el-tab-pane v-for="val in bodyData" :key="val.label" :label="val.label" :name="val.name"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { TabsPaneContext } from "element-plus";
import { LookTypeEnum } from "@/interfaces/material.interfaces";
import { computed } from "vue";

const lookType = computed(() => CharacterCenterModule.lookType)

const bodyData = [
  { name: LookTypeEnum.skin, label: 'skin' },
  { name: LookTypeEnum.cloth, label: 'cloth' },
  { name: LookTypeEnum.emotion, label: 'emotion' },
  { name: LookTypeEnum.hair, label: 'hair' },
  { name: LookTypeEnum.backext, label: 'backext' }
]
const handleClick = (tab: TabsPaneContext) => {
  CharacterCenterModule.SetLookType(tab.props.name)
}
</script>

<style lang="less" scoped>
.cloth-type {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
</style>
