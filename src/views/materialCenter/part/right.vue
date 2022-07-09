<template>
  <el-tabs :model-value="materialName" :tab-position="'right'" type="border-card" class="right-center" @tab-click="handleClick">
    <el-tab-pane :name="MaterialTypeEnum.look">
      <template #label>
        <div class="right-center_label">
          <el-icon class="label-icon"><user-filled /></el-icon>
          <span class="label-text">Look</span>
        </div>
      </template>
      <LookContent
        v-show="materialName === MaterialTypeEnum.look"
        :dataSource="dataSource"
        :isSave="false"
      ></LookContent>
    </el-tab-pane>
    <el-tab-pane :name="MaterialTypeEnum.background">
      <template #label>
        <div class="right-center_label">
          <el-icon class="label-icon"><picture-filled /></el-icon>
          <span class="label-text">Background</span>
        </div>
      </template>
      <BgContent/>
    </el-tab-pane>
    <el-tab-pane :name="MaterialTypeEnum.bgm">
      <template #label>
        <div class="right-center_label">
          <el-icon class="label-icon"><headset /></el-icon>
          <span class="label-text">Bgm</span>
        </div>
      </template>
      <BgmContent/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import BgContent from '@/views/materialCenter/part/background.vue'
import BgmContent from '@/views/materialCenter/part/bgm.vue'
import LookContent from '@/views/materialCenter/part/look.vue'
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { MaterialTypeEnum } from "@/store/modules/index.model";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { ListClothStyle } from "@/api/characterCenter";
import { CharacterCenterModule } from "@/store/modules/characterCenter";
const dataSource = ref()
const getClothStyleList = async () => {
  const { materialVOS } = await ListClothStyle()
  dataSource.value = materialVOS
}

onMounted(() => {
  getClothStyleList()
  CharacterCenterModule.Init()
})
onUnmounted(() => {
  CharacterCenterModule.ResetCharacterCenter()
})
const { t } = useI18n()
const router = useRouter()
const route = useRoute()

const materialName = computed(() => CharacterCenterModule.materialType) // 一级标题
const handleClick = (tab: any) => {
  CharacterCenterModule.SetMaterialType(tab.props.name as MaterialTypeEnum);
}

</script>

<style lang="less" scoped>
.right-center {
  border-radius: 10px;
  color: #434343;
  height: 100%;
  box-shadow: 0 1px 4px #00152914;
  border: none;
  .right-center_label {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 58px;
    .label-icon {
      font-size: 25px;
    }
    .label-text {
      font-size: 12px;
    }
  }
  /deep/ .el-tabs__item.is-right {
    padding: 10px;
    height: 80px;
    width: 80px;
    box-sizing: border-box;
    text-align: center;
    line-height: normal;
  }
  /deep/ .el-tabs--border-card{
    border: none;
  }
  /deep/.el-tabs__content {
    height: calc(100% - 30px);
    transition: width .5s ease-out .1s;
    .el-tab-pane {
      height: 100%;
    }
  }
  /deep/.el-tabs__item.is-active {
    color: #9191fd;
  }
  /deep/.el-tabs__item:not(.is-disabled):hover {
    color: #9191fd;
  }
}
</style>
