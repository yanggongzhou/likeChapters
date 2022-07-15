import { EmotionEnum, INodeItem, ISceneItem, PositionEnum, TemplateTypeEnum } from "@/interfaces/editor.interfaces";
import { GraphData, NodeConfig } from "@antv/g6";
import { EdgeConfig } from "@antv/g6-core/lib/types";

// 生成随机ID
export function getGuid():string {
  return `r${new Date().getTime()}d${Math.ceil(Math.random() * 1000)}`;
}

// 节点子项数据模型
export class SceneItemDto {
  constructor(obj: ISceneItem) {
    if (!obj.bookId || !obj.chapterId) {
      throw new Error('缺少实例参数 bookId ｜ chapterId')
    }
    this.id = obj.id || '';
    this.bookId = obj.bookId;
    this.chapterId = obj.chapterId;
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
  // 第一步 得到块
  nodeData.nodes = nodeVOS.map(item => ({
    info: { ...item },
    id: item.id,
    label: item.sceneContent
  } as NodeConfig & { info: INodeItem }))
  // 第二步 分析节点内sceneList 得到线
  nodeVOS.forEach(item => {
    if (Array.isArray(item.sceneList) && item.sceneList.length > 0) {
      const lastScene = item.sceneList[item.sceneList.length - 1]
      let edgesTargetData: string[] = [];
      if (lastScene.type === TemplateTypeEnum.对话分支) {
        edgesTargetData = lastScene.options || [];
      } else if (lastScene.type === TemplateTypeEnum.头发分支 || lastScene.type === TemplateTypeEnum.衣服分支 || lastScene.type === TemplateTypeEnum.皮肤分支) {
        edgesTargetData = lastScene.selections || [];
      }
      const edgesArr = edgesTargetData.map(opt => ({
        source: item.id,
        target: opt
      } as EdgeConfig)) || [];
      nodeData.edges = nodeData.edges?.concat(edgesArr)
    }
  });
  return nodeData;
}
