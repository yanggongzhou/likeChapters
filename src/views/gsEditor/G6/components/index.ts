import G6 from "@antv/g6";
import { storyEdgeMenu, storyNodeMenu } from "@/views/gsEditor/G6/components/storyNodeMenu";
import { storyMinimap } from "@/views/gsEditor/G6/components/minimap";
import { storyToolbar } from "@/views/gsEditor/G6/components/toolbar";
import { StoryNode } from "@/views/gsEditor/G6/components/storyNode.tsx";
import { storyEdge } from "@/views/gsEditor/G6/components/edge";
import Graph from "@antv/g6-pc/lib/graph/graph";
import { watch } from "vue";
import { GSEditorModule } from "@/store/modules/gsEditor";
import { EdgeConfig } from "@antv/g6-core/lib/types";
import { onBeforeRouteLeave } from "vue-router";
// import { storyTooltip } from "@/views/gsEditor/G6/components/tooltip";
import { useI18n } from "vue-i18n";

export interface IUseStoryGraph {
  graphInstance: Graph;
  refreshEdges: () => void;
}

const useStoryGraph = (width?: number, height?: number): IUseStoryGraph => {
  const { t } = useI18n()
  const dom = document.getElementById('storyMind')
  const graphInstance = new G6.Graph({
    container: 'storyMind', // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
    width: width || dom?.offsetWidth || 500, // Number，必须，图的宽度
    height: height || 500, // Number，必须，图的高度
    // fitCenter: true,
    linkCenter: true, // 边居中
    plugins: [storyNodeMenu(t), storyEdgeMenu(t), storyMinimap(), storyToolbar()], // storyTooltip()
    modes: {
      default: [
        'activate-relations', // 相邻节点关系
        'drag-node', // 拖拽节点
        'drag-canvas', // 整体拖拽
        'zoom-canvas', // 缩放
        // {
        //   type: 'zoom-canvas', // 缩放
        //   enableOptimize: true, // enable the optimize to hide the shapes beside nodes' keyShape
        // },
      ],
    },
    defaultNode: StoryNode(),
    defaultEdge: storyEdge(),
    layout: {
      type: 'dagre', // 自动布局
      rankdir: 'LR', // layout 的方向
      align: 'DL', // 节点对齐方式
      nodesepFunc: () => 20, // 上下间隙
      ranksepFunc: () => 80, // 左右间隙
      sortByCombo: true
    },
  });

  watch(() => GSEditorModule.isExpand, () => {
    setTimeout(() => {
      const dom = document.getElementById('storyMind')
      const width = dom?.offsetWidth || 500
      graphInstance.changeSize(width, 500)
      // storyGraph.value.fitView()
    }, 1000)
  })

  onBeforeRouteLeave((to, from, next) => {
    graphInstance.destroy()
    next()
  })

  const refreshEdges = () => {
    const edges = graphInstance.save().edges as EdgeConfig[];
    G6.Util.processParallelEdges(edges, 20, 'quadratic', 'cubic-horizontal');
    graphInstance.getEdges().forEach((edge, i) => {
      graphInstance.updateItem(edge, {
        curveOffset: edges[i].curveOffset,
        curvePosition: edges[i].curvePosition,
      });
    })
  }
  return { graphInstance, refreshEdges };
}

export default useStoryGraph;
