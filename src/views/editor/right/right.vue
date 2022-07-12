<template>
  <div class="right-warp" :class="{'right-warp_isExpand': isExpand}">
    <div class="control-btn" @click="controlBtn">
      <el-icon class="control-btn_icon" :class="{'control-btn_icon2': isExpand}"><arrow-right-bold /></el-icon>
    </div>
    <el-tabs v-model="activeName" :tab-position="'right'" type="border-card" class="right-center" @tab-click="handleClick">
      <el-tab-pane :name="ActiveNameEnum.g6">
        <template #label>
          <div class="right-center_label">
            <el-icon class="label-icon"><cherry /></el-icon>
            <span class="label-text">{{t('gsEditor.g6Path')}}</span>
          </div>
        </template>
        <EditorG6/>
      </el-tab-pane>
      <el-tab-pane :name="MaterialTypeEnum.background">
        <template #label>
          <div class="right-center_label">
            <el-icon class="label-icon"><picture-filled /></el-icon>
            <span class="label-text">background</span>
          </div>
        </template>

        <BgContent v-if="activeName === MaterialTypeEnum.background"/>
      </el-tab-pane>
      <el-tab-pane :name="MaterialTypeEnum.bgm" :title="t('gsEditor.scenes')">
        <template #label>
          <div class="right-center_label">
            <el-icon class="label-icon"><headset /></el-icon>
            <span class="label-text">bgm</span>
          </div>
        </template>
        <BgmContent v-if="activeName === MaterialTypeEnum.bgm"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import BgContent from '@/views/materialCenter/part/background.vue'
import BgmContent from '@/views/materialCenter/part/bgm.vue'
import EditorG6 from '@/views/editor/G6/index.vue'
import { computed, ref } from 'vue'
import { useI18n } from "vue-i18n";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { EditorModule } from "@/store/modules/editor";
import { MaterialTypeEnum } from "@/interfaces/material.interfaces";

enum ActiveNameEnum {
  g6 = '1'
}

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const isExpand = computed(() => EditorModule.isExpand)

const activeName = ref<ActiveNameEnum | MaterialTypeEnum>(ActiveNameEnum.g6)

const handleClick = (tab: any) => {
  if (tab.props.name === ActiveNameEnum.g6) {

  }
}
const controlBtn = () => {
  EditorModule.SetIsExpand(!isExpand.value)
}

onBeforeRouteLeave((to, from, next) => {
  if (isExpand.value) {
    EditorModule.SetIsExpand(false)
  }
  next()
})

</script>

<style lang="less" scoped>
.right-warp {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  width: 400px;
  height: 100%;
  display: grid;
  grid-template-columns: 18px auto;
  align-items: center;
  transition: width .5s ease-out .1s;

  .control-btn {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #9191fd;
    color: #fff;
    border-radius: 6px 0 0 6px;
    cursor: pointer;
    .control-btn_icon {
      transition: all .3s;
    }
    .control-btn_icon2 {
      transform: rotate(180deg);
    }
  }
}
.right-center {
  color: #434343;
  height: 100%;
  box-shadow: 0 1px 4px #00152914;
  border-radius: 10px;
  border: none;

  .right-center_label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 60px;
    .label-icon {
      font-size: 25px;
    }
    .label-text {
      transform: scale(0.8);
      font-size: 12px;
    }
  }
  /deep/ .el-tabs__item {
    padding: 10px;
    height: 80px;
    width: 75px;
    box-sizing: border-box;
    text-align: center;
    line-height: normal;
  }
  /deep/ .el-tabs--border-card{
    border: none;
  }
  /deep/.el-tabs__content {
    height: calc(100% - 30px);
    .el-tab-pane {
      height: 100%;
    }
  }
}
.right-warp_isExpand {
  width: calc(100vw - 485px);
}
</style>
