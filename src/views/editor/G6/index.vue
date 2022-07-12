<template>
  <div class="editor-container">
    <div id="choreographerMind"></div>
    <div id="storyMiniMap"></div>
    <EditNodeDialog :form="nodeForm" :visible="isEditNode" @close="isEditNode = false" @confirm="editNodeConfirm"></EditNodeDialog>
    <EditOption :form="optionForm" :visible="isEditOption" @close="isEditOption = false" @confirm="editOptionConfirm"></EditOption>
  </div>
</template>

<script lang="ts" setup>
import EditOption, { IOptionForm } from './components/editOption.vue'
import EditNodeDialog, { INodeForm } from './components/editNode.vue'
import { computed, onMounted, reactive, ref, watch } from "vue";
import useStoryGraph, { IUseStoryGraph } from "@/views/editor/G6/components/index";
import { IG6GraphEvent, Item } from "@antv/g6-core";
import storyBus from "@/utils/storyBus";
import { GraphData, IEdge, INode } from "@antv/g6";
import {
  AddLine,
  AddNode,
  EditNode,
  DeleteLine,
  DeleteNode,
  EditLine,
  IEditNodeParam,
  IAddNodeParam
} from "@/api/gsEditor";
import { TemplateTypeEnum } from "@/store/modules/result.model";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import { EBoolean } from "@/interfaces/common.interfaces";
import { getGuid } from "@/utils/resultModule";
import { ChoreographerModule } from "@/store/modules/choreographer";
import { debounce } from "lodash";

const optionForm = reactive<IOptionForm>({} as IOptionForm)
const nodeForm = reactive<INodeForm>({} as INodeForm)

const route = useRoute();
const bookId = computed(() => route.query.bookId as string) // 书籍id
const chapterId = computed(() => route.query.chapterId as string) // 章节id

const isEditNode = ref(false)
const isEditOption = ref(false)

const activeNodeId = computed(() => ChoreographerModule.activeNodeId)
const storyGraph = reactive<IUseStoryGraph>({} as IUseStoryGraph)
const testEdge = ref()
const addingEdge = ref(false)

onMounted(() => {
  const { graphInstance, refreshEdges } = useStoryGraph()
  storyGraph.graphInstance = graphInstance
  storyGraph.refreshEdges = refreshEdges
  storyGraph.graphInstance.on("click", canvasClick);
  storyGraph.graphInstance.on("node:click", nodeClick);
  storyGraph.graphInstance.on("mousemove", onMousemove);
  storyGraph.graphInstance.on('nodeselectchange', (e) => {
    console.log(e.selectedItems, e.select);
    console.log(e)
  });

  storyBus.on('G6/AddNode', addNode as any);
  storyBus.on('G6/EditNode', editNode as any)
  storyBus.on('G6/DeleteNode', deleteNode as any);
  storyBus.on('G6/AddEdge', addEdge as any);
  storyBus.on('G6/EditOption', editOption as any);
  storyBus.on('G6/DeleteOption', deleteOption as any);
  storyBus.on('G6/InsertNode', insertNode as any)
  storyBus.on('ChoreographerModule/refreshData', refreshData as any)

  window.addEventListener('resize', choResize)
})

const choResize = debounce(() => {
  const dom = document.getElementById('choreographerMind')
  const width = dom?.offsetWidth || 500;
  const height = dom?.offsetHeight || 500;
  storyGraph.graphInstance.changeSize(width, height)
}, 1000)

const refreshData = async (g6Data: GraphData): Promise<void> => {
  console.log(g6Data)
  try {
    // 在一起使用时注意，先缩放后移动位置 以下顺序勿动
    // 在拉取新数据重新渲染页面之前先获取点（0， 0）在画布上的位置 当前缩放比例
    const lastPoint = storyGraph.graphInstance.getCanvasByPoint(0, 0);
    const zoom = storyGraph.graphInstance.getZoom();
    storyGraph.graphInstance.read(g6Data)
    storyGraph.graphInstance.zoomTo(zoom);
    // 获取重新渲染之后点（0， 0）在画布的位置
    const newPoint = storyGraph.graphInstance.getCanvasByPoint(0, 0);
    // 移动画布相对位移
    storyGraph.graphInstance.translate(lastPoint.x - newPoint.x, lastPoint.y - newPoint.y);
    storyGraph.refreshEdges()
  } catch (e) {
    // location.reload()
  }
}

const canvasClick = (evt: IG6GraphEvent) => {
  if ((!evt.item || evt.item._cfg?.type !== 'node') && addingEdge.value && testEdge.value) {
    storyGraph.graphInstance.removeItem(testEdge.value);
    testEdge.value = undefined;
    addingEdge.value = false;
  }
}

watch(() => ChoreographerModule.activeNodeId, (newValue, oldValue) => {
  const oldItem = storyGraph.graphInstance.findById(oldValue)
  oldItem && storyGraph.graphInstance.updateItem(oldItem, { color: '#9191fd' })
  const newItem = storyGraph.graphInstance.findById(newValue)
  newItem && storyGraph.graphInstance.updateItem(newItem, { color: 'red' })
})

const nodeClick = async (evt: IG6GraphEvent) => {
  const model = evt.item?.getModel();
  // 添加线
  if (addingEdge.value && testEdge.value) {
    if (testEdge.value?._cfg?.model?.source === evt.item?.getModel().id) return; // 禁止自选闭环
    const testEdgeModel = testEdge.value.getModel();
    // 添加指向
    await AddLine({
      bookId: bookId.value,
      chapterId: chapterId.value,
      previousNodeId: testEdgeModel.source,
      nextNodeId: model?.id as string,
      content: testEdgeModel.label, // 选项内容、名称
      optionType: TemplateTypeEnum.选项, // 选项类型 通用分支类型
      free: EBoolean.yes, // 是否免费
      coin: 0, // 钱币
    })
    testEdge.value = undefined;
    addingEdge.value = false;

    await ChoreographerModule.GetChapterList({ bookId: bookId.value, chapterId: chapterId.value });
  } else {
    if (evt.item?.getModel().id === activeNodeId.value) return
    storyBus.emit('saveNode', evt.item?.getModel() as any)
  }
}

const onMousemove = (ev: IG6GraphEvent) => {
  const point = { x: ev.x, y: ev.y };
  if (addingEdge.value && testEdge.value) {
    // Update the end node to the current node the mouse clicks
    storyGraph.graphInstance.updateItem(testEdge.value, {
      target: point,
    });
  }
}

const addNode = async (item: Item): Promise<void> => {
  isEditNode.value = true
  const model = item.getModel();
  nodeForm.id = void 0;
  nodeForm.previousNodeId = model?.id as string;
  nodeForm.content = `<p class="sceneheading" id="${getGuid()}"><br></p>`;
  nodeForm.bookId = bookId.value;
  nodeForm.chapterId = chapterId.value;
  nodeForm.nodeName = '';
  nodeForm.nodeIntro = '';
  nodeForm.startNode = EBoolean.no;
  nodeForm.totalNum = 0;
  insertNodeData.oldEdges = [];
  insertNodeData.isInsertNode = false;
}

const editNode = async (item: Item): Promise<void> => {
  isEditNode.value = true
  const model = item.getModel() as unknown as INodeForm;
  nodeForm.id = model.id;
  nodeForm.previousNodeId = model.previousNodeId;
  nodeForm.content = model.content;
  nodeForm.bookId = model.bookId;
  nodeForm.chapterId = model.chapterId;
  nodeForm.nodeName = model.nodeName;
  nodeForm.nodeIntro = model.nodeIntro;
  nodeForm.startNode = model.startNode;
  nodeForm.totalNum = model.totalNum;
  insertNodeData.oldEdges = [];
  insertNodeData.isInsertNode = false;
}

const editNodeConfirm = async (nodeData: INodeForm) => {
  if (nodeData.id) {
    await EditNode({ ...nodeData, previousNodeId: undefined } as IEditNodeParam)
  } else {
    const { id = '' } = await AddNode({ ...nodeData, previousNodeId: undefined } as IAddNodeParam)
    // 添加指向
    await AddLine({
      bookId: bookId.value,
      chapterId: chapterId.value,
      previousNodeId: nodeData.previousNodeId,
      nextNodeId: id,
      content: '', // 选项内容、名称
      optionType: TemplateTypeEnum.选项, // 选项类型 通用分支类型
      free: EBoolean.yes, // 是否免费
      coin: 0, // 钱币
    })

    if (insertNodeData.isInsertNode) {
      insertNodeData.oldEdges.forEach(edgeItem => {
        const edgeItemModel = edgeItem.getModel() as unknown as IOptionForm & { optionId: string};
        const optionDetail = {
          id: edgeItemModel.optionId,
          content: edgeItemModel.content,
          bookId: edgeItemModel.bookId,
          chapterId: edgeItemModel.chapterId,
          previousNodeId: id,
          nextNodeId: edgeItemModel.nextNodeId,
          optionType: edgeItemModel.optionType,
          free: edgeItemModel.free,
          coin: edgeItemModel.coin,
        }
        EditLine({
          ...optionDetail,
        })
      })
    }
  }

  await ChoreographerModule.GetChapterList({ bookId: bookId.value, chapterId: chapterId.value });
  isEditNode.value = false
}

const addEdge = (item: Item) => {
  const model = item.getModel();
  if (!(addingEdge.value && testEdge.value)) {
    testEdge.value = storyGraph.graphInstance?.addItem('edge', {
      source: model?.id,
      target: model?.id,
      label: '',
      bookId: bookId.value,
      chapterId: chapterId.value,
      content: '',
      previousNodeId: model?.id,
      optionType: TemplateTypeEnum.选项,
      free: EBoolean.yes,
      coin: 0
    }) as IEdge;
    addingEdge.value = true;
  }
}

const deleteNode = async (item: INode) => {
  const model = item.getModel();
  await DeleteNode(model.id as string)
  await ChoreographerModule.GetChapterList({ bookId: bookId.value, chapterId: chapterId.value });
}

const editOption = (item: Item) => {
  isEditOption.value = true
  const { optionId, content, bookId, chapterId, previousNodeId, nextNodeId, optionType, free, coin } = item.getModel() as unknown as IOptionForm & { optionId: string};
  optionForm.id = optionId;
  optionForm.content = content;
  optionForm.bookId = bookId;
  optionForm.chapterId = chapterId;
  optionForm.previousNodeId = previousNodeId;
  optionForm.nextNodeId = nextNodeId;
  optionForm.optionType = optionType;
  optionForm.free = free;
  optionForm.coin = coin;
}
// 编辑选项确认
const editOptionConfirm = async (optionDetail: IOptionForm) => {
  await EditLine({
    ...optionDetail,
  })
  // 钻石配置到下个节点中， 晚些实现
  isEditOption.value = false
  await ChoreographerModule.GetChapterList({ bookId: bookId.value, chapterId: chapterId.value });
}
const deleteOption = async (item: Item) => {
  const { optionId } = item.getModel();
  await DeleteLine(optionId as string)
  await ChoreographerModule.GetChapterList({ bookId: bookId.value, chapterId: chapterId.value });
}

// 插入节点前的连线
const insertNodeData = reactive<{oldEdges: IEdge[]; isInsertNode: boolean}>({
  oldEdges: [],
  isInsertNode: false
})

const isInsertNode = ref(false)
const insertNode = (item: INode) => {
  isEditNode.value = true
  const model = item.getModel();
  nodeForm.id = void 0;
  nodeForm.previousNodeId = model?.id as string;
  nodeForm.content = `<p class="sceneheading" id="${getGuid()}"><br></p>`;
  nodeForm.bookId = bookId.value;
  nodeForm.chapterId = chapterId.value;
  nodeForm.nodeName = '';
  nodeForm.nodeIntro = '';
  nodeForm.startNode = EBoolean.no;
  nodeForm.totalNum = 0;

  const itemEdges = item.getEdges() || [] as IEdge[];
  const itemId = item.getModel().id;
  insertNodeData.oldEdges = itemEdges.filter(edgeItem => itemId === edgeItem.getModel().source);
  insertNodeData.isInsertNode = true;
}

onBeforeRouteLeave((to, from, next) => {
  storyBus.off('G6/AddNode', addNode as any);
  storyBus.off('G6/EditNode', editNode as any)
  storyBus.off('G6/DeleteNode', deleteNode as any);
  storyBus.off('G6/AddEdge', addEdge as any);
  storyBus.off('G6/EditOption', editOption as any);
  storyBus.off('G6/DeleteOption', deleteOption as any);
  storyBus.off('G6/InsertNode', insertNode as any)
  storyBus.off('ChoreographerModule/refreshData', refreshData as any)
  window.removeEventListener('resize', choResize)
  next()
})
</script>

<style lang="less" scoped>
.editor-container {
  height: 100%;
  width: 100%;
  position: relative;

  #choreographerMind {
    font-size: 0;
    min-height: 500px;
    height: 100%;
    width: 100%;
    //position: relative; // 非static情况下，会冲突g6的菜单等浮动框位置等(TB条件下)，无FUCK说
    border-radius: 5px;
    //background: #364b421f;
    background-image: linear-gradient(#364b421f 14px,#364b421f 0), linear-gradient(105deg,white 1px,#364b421f 0);
    background-size:15px 15px,15px 15px;

    /deep/ .g6-minimap {
      border: 1px dashed gray;
      padding: 10px;
    }
    /deep/.g6-component-contextmenu {
      border-radius: 10px;
      border: 1px solid #b5b7bb;
      color: #5c5b5b;
      background-color: rgba(255, 255, 255, 0.9);
    }
    /deep/.g6-component-toolbar {
      li {
        &:nth-child(1), &:nth-child(2) {
          display: none;
        }
      }
    }
  }

  #storyMiniMap {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 9;
    background: #FFFFFF9E;
    box-shadow: 0 1px 4px #00152914;
    border-radius: 5px 0 0;
  }
}
</style>