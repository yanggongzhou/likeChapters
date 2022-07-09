<template>
  <div class="right-warp">
    <el-tabs v-model="activeName" :tab-position="'left'" type="border-card" class="right-center" :class="{'right-center_isExpand': isExpand}" @tab-click="handleClick">
      <el-tab-pane :name="ActiveNameEnum.g6">
        <template #label>
          <div class="right-center_label">
            <el-icon class="label-icon"><cherry /></el-icon>
            <span class="label-text">{{t('gsEditor.g6Path')}}</span>
          </div>
        </template>
        <StoryG6/>
      </el-tab-pane>
      <el-tab-pane :name="ActiveNameEnum.characters">
        <template #label>
          <div class="right-center_label">
            <el-icon class="label-icon"><user-filled /></el-icon>
            <span class="label-text">{{ t('gsEditor.characters') }}</span>
          </div>
        </template>

        <CharacterList v-if="activeName === ActiveNameEnum.characters"/>
      </el-tab-pane>
      <el-tab-pane :name="ActiveNameEnum.scenes" :title="t('gsEditor.scenes')">
        <template #label>
          <div class="right-center_label">
            <el-icon class="label-icon"><picture-filled /></el-icon>
            <span class="label-text">{{ t('gsEditor.scenes') }}</span>
          </div>
        </template>
        <Biography v-if="activeName === ActiveNameEnum.scenes"/>
      </el-tab-pane>
    </el-tabs>
    <div class="control-btn" @click="controlBtn">
      <el-icon class="control-btn_icon" :class="{'control-btn_icon2': isExpand}"><arrow-right-bold /></el-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CharacterList from '@/views/bookCenter/bookSource/characterList/characterList.vue'
import Biography from './biography/biography.vue'
import StoryG6 from '@/views/gsEditor/G6/index.vue'
import { computed, ref } from 'vue'
import { useI18n } from "vue-i18n";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { GSEditorModule } from "@/store/modules/gsEditor";

enum ActiveNameEnum {
  g6 = '1',
  characters = '2',
  scenes = '3'
}

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const isExpand = computed(() => GSEditorModule.isExpand)
const activeName = ref<ActiveNameEnum>(ActiveNameEnum.g6)

const handleClick = (tab: any) => {
  if (tab.props.name === ActiveNameEnum.g6) {

  }
}
const controlBtn = () => {
  GSEditorModule.SetIsExpand(!isExpand.value)
}

onBeforeRouteLeave((to, from, next) => {
  if (isExpand.value) {
    GSEditorModule.SetIsExpand(false)
  }
  next()
})

</script>

<style lang="less" scoped>
.right-warp {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
  height: calc(100% - 14px);
  margin: 10px 0;
  display: grid;
  grid-template-columns: auto 18px;
  align-items: center;
  .control-btn {
    height: 50px;
    display: flex;
    align-items: center;
    background-color: #9191fd;
    color: #fff;
    border-radius: 0 6px 6px 0;
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
  border-radius: 5px;
  color: #434343;
  height: 100%;
  box-shadow: 0 1px 4px #ced1d5;
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
  /deep/.character-warp {
    box-shadow: none;
    overflow-y: auto;
    height: calc(100vh - 105px);
    .character-list {
      margin: 0;
      overflow-x: hidden;
      .title {
        display: none;
      }
      .list-box {
        .list-item {
          .character-name {
            .name {
              width: 150px;
            }
          }
        }
      }
    }
    .foot-create {
      display: none;
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
    width: 380px;
    height: calc(100% - 30px);
    transition: width .5s ease-out .1s;
    .el-tab-pane {
      height: 100%;
    }
  }
}
.right-center_isExpand {
  /deep/.el-tabs__content {
    width: calc(100vw - 180px);
  }
}
</style>
