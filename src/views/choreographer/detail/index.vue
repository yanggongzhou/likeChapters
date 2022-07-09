<template>
  <div class="cho-detail">
    <div class="cho-detail_content">
      <div>详情</div>
      <div>
        {{ nodeInfo }}
      </div>
      <el-collapse :model-value="collapseValue" accordion @change="collapseChange">
        <el-collapse-item name="1">
          <template #title>
            行为<el-icon class="header-icon">
            <info-filled />
          </el-icon>
          </template>
          <ActionForm
            :form="{}"
          />
        </el-collapse-item>
        <el-collapse-item title="角色动作" name="2">
          <AnimationForm
            :form="{}"
          />
        </el-collapse-item>
        <el-collapse-item title="Others" name="3">
          <div>
            Something
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AnimationForm from './animationForm/animationForm.vue'
import ActionForm from './actionForm/actionForm.vue'
import { onMounted, ref } from "vue";
import storyBus from "@/utils/storyBus";
import { ChoreographerModule } from "@/store/modules/choreographer";
import { NodeConfig } from "@antv/g6-core/lib/types";
import { ITemplate } from "@/store/modules/result.model";

onMounted(() => {
  storyBus.on('saveNode', saveNode as any)
})

const nodeInfo = ref({} as ITemplate);

const collapseValue = ref('1')

const saveNode = async(node: NodeConfig & {info: ITemplate}) => {
  ChoreographerModule.SetActiveNodeId(node.id)
  nodeInfo.value = node.info;
}

const collapseChange = (activeNames: string) => {
  console.log('collapseChange--->', activeNames)
}
</script>

<style lang="less" scoped>
.cho-detail {
  height: 100%;
  .cho-detail_content {

  }
}
</style>
