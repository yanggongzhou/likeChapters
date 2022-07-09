<template>
  <div class="left-warp">
    <div class="left-top">
      <el-radio-group :model-value="typeList[pressTabNum - 1]" @change="(val) => emits('typeChange', val)" size="small" :disabled="disabled">
        <el-radio border v-for="val in typeList" :key="val" :label="val">{{ t('gsEditor.' + val)  }}</el-radio>
      </el-radio-group>
    </div>
    <div class="left-center">
      <el-tabs v-model="tabName" class="demo-tabs">
        <el-tab-pane :label="t('gsEditor.scene')" name="1">
          <!-- 场景标题列表 -->
          <div v-if="titleList.length">
            <p class="title-item scenes"
               :id="'title' + item.titleId"
               v-anchor="item.titleId"
               v-for="(item) in titleList"
               :key="item.titleId"
               v-html="item.sceneTitle"></p>
          </div>
          <el-empty v-else :description="t('common.noData')"></el-empty>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="left-bottom">
      <p>{{ t('gsEditor.words') }}:{{ textLength }}</p>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
const tabName = ref('1')
const { t } = useI18n()
const route = useRoute()

const emits = defineEmits(['typeChange'])

const props = defineProps({
  pressTabNum: Number,
  textLength: {
    type: Number,
    default: 0
  },
  typeList: {
    type: Array,
    default: () => []
  },
  titleList: {
    type: Array,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="less" scoped>
@Color: #ffffff;
.left-warp {
  height: calc(100vh - 230px);
  max-width: 232px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  counter-reset: chapter 0;
  .left-top {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: @Color;
    box-shadow: 0 2px 4px #ced1d5;;
    /deep/.el-radio.is-bordered {
      width: 100px;
      height: 30px;
      margin: 0 5px 5px;
    }
    /deep/.el-radio__input {
      display: none;
    }
    /deep/.el-radio.is-bordered.is-checked {
      border-color: #9191fd;
    }
    /deep/.el-radio__input.is-checked+.el-radio__label {
      color: #9191fd;
    }
  }
  .left-center {
    flex: 1 1;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 20px;
    background-color: @Color;
    box-sizing: border-box;
    overflow-y: auto;
    box-shadow: 0 2px 4px #ced1d5;;

    .scenes {
      text-transform: uppercase;
    }

    .title {
      font-size: 16px;
      margin-bottom: 20px;
      text-align: left;
      font-weight: bold;
    }

    .title-item {
      font-size: 13px;
      padding: 5px 0;
      border-bottom: 1px solid #ffffff;
      cursor: pointer;
      white-space: normal;
      word-wrap: break-word;
      word-break: break-all;
    }

    .title-item:hover {
      color: #9191fd;
    }

    .title-item::before {
      content: counter(chapter) '.';
      counter-increment: chapter;
      font-size: 14px;
      width: 40px;
      text-align: center;
    }
  }

  .left-bottom {
    border-radius: 5px;
    box-shadow: 0 2px 4px #ced1d5;;
    line-height: 35px;
    background-color: @Color;
    font-size: 14px;
    border-top: 1px solid #ffffff;

    p {
      text-align: center;
    }
  }
}
</style>
