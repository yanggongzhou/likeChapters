<template>
  <el-table
    v-load="loading"
    element-loading-text="Loading..."
    :element-loading-spinner="svg"
    element-loading-svg-view-box="-10, -10, 50, 50"
    element-loading-background="rgba(0, 0, 0, 0.7)"
    style="width: 100%"
    :data="data"
    :max-height="maxHeight"
    tooltip-effect="dark"
    :show-overflow-tooltip="true"
    @cell-click="(row, column) => cellClick(row, column)"
  >
    <el-table-column
      v-if="showIndex"
      type="index"
      label="序号"
      width="60"
      align="center"
    />
    <template v-for="(column) in columns">
      <el-table-column
        v-if="column.slot"
        :key="column.prop"
        :property="column.prop"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        align="center"
      >
        <template #default="scope">
          <slot :name="column.prop" :row="scope.row" :index="scope.$index"/>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        :key="column.prop"
        :property="column.prop"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        align="center"
        :show-overflow-tooltip="true"
      />
    </template>
  </el-table>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";

export interface ICustomTableColumn {
  prop: string;
  label?: string;
  width?: string | number;
  slot?: boolean;
  fixed?: boolean | 'left' | 'right';
}

export default defineComponent({
  name: 'DzTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: Number || String,
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array as PropType<ICustomTableColumn[]>,
      required: true
    },
    totalTitle: {
      type: String,
      default: ''
    },
    showIndex: {
      type: Boolean,
      default: true
    }
  },
  emits: ['columnClick'],
  setup: function (_, ctx) {
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    const cellClick = (row: any, column: TableColumnCtx<any>) => {
      ctx.emit('columnClick', row, column.property)
    }
    return {
      svg,
      cellClick
    }
  }
})
</script>

<!--<style lang="less" scoped>-->

<!--</style>-->
