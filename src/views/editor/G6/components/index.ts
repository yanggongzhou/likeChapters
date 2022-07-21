import G6 from "@antv/g6";
import { storyEdgeMenu, storyNodeMenu } from "@/views/editor/G6/components/storyNodeMenu";
import { storyMinimap } from "@/views/editor/G6/components/minimap";
import { storyToolbar } from "@/views/editor/G6/components/toolbar";
import { ChoNode } from "@/views/editor/G6/components/choNode.tsx";
import Graph from "@antv/g6-pc/lib/graph/graph";
import { EdgeConfig } from "@antv/g6-core/lib/types";
import { onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";

export interface IUseStoryGraph {
  graphInstance: Graph;
  refreshEdges: () => void;
}

const useStoryGraph = (width?: number, height?: number): IUseStoryGraph => {
  const { t } = useI18n();
  const dom = document.getElementById('editorMind')
  const graphInstance = new G6.Graph({
    container: 'editorMind', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: width || dom?.offsetWidth || 500, // Number，必须，图的宽度
    height: height || dom?.offsetHeight || 500, // Number，必须，图的高度
    fitCenter: true,
    linkCenter: true, // 边居中
    plugins: [storyNodeMenu(t), storyEdgeMenu(t), storyMinimap(), storyToolbar()],
    modes: {
      default: [
        // 'lasso-select', // 套索选择
        'activate-relations', // 相邻节点关系
        'drag-node', // 拖拽节点
        'drag-canvas', // 整体拖拽
        'zoom-canvas', // 缩放
      ],
    },
    defaultNode: ChoNode(),
    defaultEdge: {
      type: 'polyline',
      style: {
        radius: 20,
        offset: 45,
        endArrow: true,
        lineWidth: 2,
        stroke: '#C2C8D5',
      },
    },
    layout: {
      type: 'dagre', // 自动布局
      rankdir: 'TB', // layout 的方向  LR 左->右 TB 上->下
      // align: 'DL', // 节点对齐方式
      ranksep: 6,
      nodesepFunc: () => 10, // 上下间隙
      // ranksepFunc: () => 20, // 左右间隙 ps: 上下时TB不生效， 4.6.4的bug，很烦
      sortByCombo: true
    },
  });

  onBeforeRouteLeave((to, from, next) => {
    graphInstance.destroy()
    next()
  })

  const refreshEdges = () => {
    const edges = graphInstance.save().edges as EdgeConfig[];
    // 数据预处理 处理平行边 自动绘制
    G6.Util.processParallelEdges(edges, 20, 'quadratic', 'cubic-vertical');
    // graphInstance.getEdges().forEach((edge, i) => {
    //   graphInstance.updateItem(edge, {
    //     curveOffset: edges[i].curveOffset,
    //     curvePosition: edges[i].curvePosition,
    //   });
    // })
  }
  return { graphInstance, refreshEdges };
}

export default useStoryGraph;
