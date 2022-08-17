<template>
  <el-dropdown trigger="click" @command="linkTo">
    <el-tooltip
      effect="dark"
      content="link"
      placement="top"
    >
      <img class="link" src="../../../../assets/img/link.png" alt="">
    </el-tooltip>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="val in nodeList" :command="val.id" :key="val.id">{{ val.sceneContent }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>

import { computed, defineEmits } from "vue";
import { EditorModule } from "@/store/modules/editor";

const emits = defineEmits(['linkTo'])
const nodeList = computed(() => EditorModule.nodeList.filter(val => val.id !== EditorModule.activeNodeId))
const linkTo = (nodeId) => {
  emits('linkTo', nodeId)
}
</script>

<style lang="less" scoped>
.link {
  width: 30px;
  height: 30px;
}
</style>
