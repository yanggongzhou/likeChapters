<template>
  <div class="cloth-style">
    <div class="style-type">
      <ClothType/>
    </div>

    <div class="cloth-item-warp">
      <div class="cloth-item-content">
        <ClothItem
            v-for="val in list"
            :url="val.materialUrl"
            :key="val.id"
            :size="[LookTypeEnum.emotion, LookTypeEnum.hair, LookTypeEnum.backext].indexOf(val.lookType) !==-1 ? 'small' : 'default' "
            :isChecked="isChecked === val.id"
            @click="selectCloth(val)"></ClothItem>
      </div>
    </div>

    <div class="save-btn">
      <el-button size="large" round @click="emits('onCancel')">{{ t('common.cancel') }}</el-button>
      <el-button type="primary" size="large" round @click="emits('onSave')">{{ t('common.save') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'
import ClothType from './clothType.vue'
import ClothItem from './clothItem.vue'
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { useI18n } from "vue-i18n";
import { LookTypeEnum } from "@/interfaces/material.interfaces";

const { t } = useI18n()
const emits = defineEmits([ 'onSave', 'onCancel' ])

const props = defineProps({
  dataSource: Object
})

const list = computed(() => props.dataSource?.filter(val => val.lookType === CharacterCenterModule.lookType) || [])

const isChecked = computed(() => {
  return CharacterCenterModule.dressUpItem?.[LookTypeEnum[CharacterCenterModule.lookType]]?.id || ''
})

const selectCloth = ({ id, materialUrl }: { id: number, materialUrl: string }) => {
  CharacterCenterModule.SetDressUpItem({ id, url: materialUrl })
}

</script>

<style lang="less" scoped>
.cloth-style {
  display: grid;
  grid-template-rows: 160px auto 60px;
  grid-row-gap: 20px;

  .style-type {
    background-color: #ffffff;
    box-shadow: 0 1px 4px #00152914;
    border-radius: 10px;
  }

  .cloth-item-warp {
    background-color: #ffffff;
    box-shadow: 0 1px 4px #00152914;
    border-radius: 10px;

    .cloth-item-content {
      margin: 20px;
      display: flex;
    }
  }

  .save-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /deep/.el-button {
      width: 100px;
      font-size: 16px;
    }
  }
}
</style>
