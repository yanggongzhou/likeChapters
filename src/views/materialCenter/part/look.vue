<template>
  <div class="cloth-style" :class="{'cloth-style_nosave': !isSave}">
    <div class="style-type">
      <ClothType/>
    </div>

    <div class="cloth-item-warp">
      <div class="cloth-item-content">
        <ClothItem
            v-for="val in list"
            :url="val.materialUrl"
            :key="val.id"
            :size="[ClothTypeEnum.faceType, ClothTypeEnum.hair, ClothTypeEnum.jewelry].indexOf(val.materialType) !==-1 ? 'small' : 'default' "
            :isChecked="isChecked === val.materialUrl"
            @click="selectCloth(val)"></ClothItem>
      </div>
    </div>

    <div class="save-btn" v-if="isSave">
      <el-button size="large" round @click="emits('onCancel')">{{ t('common.cancel') }}</el-button>
      <el-button type="primary" size="large" round @click="emits('onSave')">{{ t('common.save') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'
import ClothType from '@/views/characterCenter/clothStyle/clothType.vue'
import ClothItem from '@/views/characterCenter/clothStyle/clothItem.vue'
import { CharacterCenterModule } from "@/store/modules/characterCenter";
import { useI18n } from "vue-i18n";
import { ClothTypeEnum } from "@/store/modules/index.model";

const { t } = useI18n()
const emits = defineEmits([ 'onSave', 'onCancel' ])

const activeName = computed(() => CharacterCenterModule.clothType)
const props = defineProps({
  dataSource: Object,
  isSave: {
    type: Boolean,
    default: true
  }, // 是否显示保存
})
const list = computed(() => props.dataSource?.[activeName.value] || [])
const isChecked = computed(() => {
  if (CharacterCenterModule.selectStyleItem.materialVOS && CharacterCenterModule.selectStyleItem.materialVOS.length > 0) {
    const data = CharacterCenterModule.selectStyleItem.materialVOS.filter(val => val.materialType === CharacterCenterModule.clothType)
    return data.length > 0 ? data[0].materialUrl : ''
  }
  return ''
})

const selectCloth = ({ id, materialUrl }: { id: number, materialUrl: string }) => {
  CharacterCenterModule.SetSelectStyleItem({ id, url: materialUrl })
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
.cloth-style_nosave {
  grid-template-rows: 160px auto;
  height: 100%;
}
</style>
