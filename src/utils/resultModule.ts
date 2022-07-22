import {
  EmotionEnum,
  IEditorNodeConfig,
  INodeItem,
  ISceneItem,
  PositionEnum,
  TemplateTypeEnum
} from "@/interfaces/editor.interfaces";
import { GraphData, NodeConfig } from "@antv/g6";
import { EdgeConfig } from "@antv/g6-core/lib/types";

// 节点子项数据模型
export class SceneItemDto {
  constructor(obj: ISceneItem) {
    if (!obj.bookId || !obj.chapterId || !obj.nodeId) {
      throw new Error('缺少实例参数 bookId ｜ chapterId | nodeId')
    }
    this.id = obj.id;
    this.bookId = obj.bookId;
    this.chapterId = obj.chapterId;
    this.nodeId = obj.nodeId;
    this.sceneNum = obj.sceneNum || '';
    this.roleId = obj.roleId;
    this.roleName = obj.roleName;
    this.look = obj.look;
    this.bgmId = obj.bgmId;
    this.sceneBg = obj.sceneBg;
    this.options = obj.options;
    this.selections = obj.selections;
    this.sceneAround = obj?.sceneAround || false;
    this.sceneContent = obj?.sceneContent || '';
    this.emotion = obj.emotion || EmotionEnum.无表情;
    this.content = obj.content || '';
    this.type = obj.type || TemplateTypeEnum.旁白;
    this.nextId = obj.nextId || '';
    this.cameraPos = obj.cameraPos || PositionEnum.中间;
    this.posId = obj.posId || PositionEnum.中间;
  }

  readonly id?: string;
  readonly bookId?: string;
  readonly chapterId?: string;
  readonly nodeId?: string;
  sceneNum?: string; // 场景编号
  roleId?: string; // 角色Id role_id
  roleName?: string; // 角色名称
  look?: string; // 装扮类型
  emotion?: EmotionEnum; // 表情
  content?: string; // 内容
  type: TemplateTypeEnum; // 节点类型
  // end: false, // 是否本章重点
  nextId: string; // 下个节点 next_id
  cameraPos: PositionEnum; // 镜头 camera_pos
  posId: PositionEnum; // 位置 pos_id
  bgmId?: string; // 背景音乐 bgm_id
  sceneBg?: string; // 场景背景名称 scene_bg
  sceneAround: boolean; // 场景环视，是一个特效 scene_around
  sceneContent?: string; // 场景标题｜内容
  options?: string[]; // 对话选项
  selections?: string[]; // 服饰选项
}

// 转换数据 ---
export const AnalyseEditorData = (nodeVOS: INodeItem[]): GraphData => {
  const nodeData = {
    nodes: [],
    edges: []
  } as GraphData; // 编导路径图
  // 1.1 得到Node (基于scene)
  nodeData.nodes = nodeVOS.map(item => ({
    info: { ...item },
    id: item.id,
    label: item.sceneContent
  } as IEditorNodeConfig))
  // 1.2 得到Node (基于Branch Options)
  const _nodes: IEditorNodeConfig[] = []
  nodeVOS.forEach(item => {
    if (Array.isArray(item.sceneList) && item.sceneList.length > 0) {
      const filterTypes = [
        TemplateTypeEnum.头发分支,
        TemplateTypeEnum.衣服分支,
        TemplateTypeEnum.皮肤分支,
        TemplateTypeEnum.对话分支,
        TemplateTypeEnum.选项
      ]
      const branchOptionList = item.sceneList.filter(val => {
        return filterTypes.indexOf(val.type) !== -1
      });
      if (branchOptionList.length > 0) {
        branchOptionList.forEach(bp => {
          _nodes.push({
            info: { ...bp },
            id: bp.id as string,
            label: bp.type === TemplateTypeEnum.选项 ? 'Option' : 'Branch',
            color: bp.type === TemplateTypeEnum.选项 ? '#a1a1a1' : '#e98f8f'
          })
        })
      }
    }
  })
  nodeData.nodes = nodeData.nodes.concat(_nodes)

  // 第二步 分析节点内sceneList 得到Edges
  nodeVOS.forEach((item, index) => {
    if (Array.isArray(item.sceneList) && item.sceneList.length > 0) {
      const lastScene = item.sceneList[item.sceneList.length - 1];
      const filterTypes = [
        TemplateTypeEnum.头发分支,
        TemplateTypeEnum.衣服分支,
        TemplateTypeEnum.皮肤分支,
        TemplateTypeEnum.对话分支
      ]
      const branchItem = item.sceneList.find(val => {
        return filterTypes.indexOf(val.type) !== -1
      });
      let normalEdge: string[] = [];
      let edgesTargetData: string[] = [];
      if (branchItem) {
        if (lastScene.type === TemplateTypeEnum.对话分支) {
          edgesTargetData = lastScene.options || [];
        } else {
          edgesTargetData = lastScene.selections || [];
        }
      } else {
        // 如果没有分支时的选择 (需调整)
        if (index === nodeVOS.length - 1) return;
        const nextItem = nodeVOS[index + 1]
        normalEdge = nextItem?.id ? [nextItem?.id] : [];
      }
      const edgesArr1 = normalEdge.map(opt => ({
        source: item.id,
        target: opt
      } as EdgeConfig)) || [];

      // edgesTargetData.forEach(val =>)

      const edgesArr2 = edgesTargetData.map(opt => ({
        source: branchItem?.id,
        target: opt
      } as EdgeConfig)) || [];

      nodeData.edges = nodeData.edges?.concat([...edgesArr1, ...edgesArr2])
    }
  });
  return nodeData;
}
