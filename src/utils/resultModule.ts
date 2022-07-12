import { ClassNameTypeEnumZH, INodeVOSItem, IOptionItem } from "@/store/modules/index.model";
import { EmotionEnum, ITemplate, TemplateTypeEnum } from "@/store/modules/result.model";
import { EdgeConfig, NodeConfig } from "@antv/g6-core/lib/types";
import { GraphData } from "@antv/g6";
import { fittingString } from "@/views/editor/G6/components/choNode";

// 生成随机ID
export function getGuid():string {
  return `r${new Date().getTime()}d${Math.ceil(Math.random() * 1000)}`;
}

// 最终节点数据
export const templateItem = (id?: string):ITemplate => ({
  id: id || getGuid(),
  sceneId: '', // 场景Id
  sceneNum: '', // 场景编号
  roleId: '', // 角色Id role_id
  roleName: '', // 角色名称
  look: '', // 装扮类型
  emotion: EmotionEnum.无表情, // 表情
  content: '', // 内容
  type: TemplateTypeEnum.旁白, // 节点类型
  end: false, // 是否本章重点
  nextId: '', // 下个节点 next_id
  cameraPos: 'center', // 镜头 camera_pos
  posId: 'center', // 位置 pos_id
  bgmId: '', // 背景音乐 bgm_id
  sceneBg: '', // 场景背景名称 scene_bg
  sceneAround: false, // 场景环视，是一个特效 scene_around
  sceneContent: '', // 场景标题｜内容
  options: [], // 对话选项
  selections: [], // 服饰选项
})

// 转换数据 --- 编导
export const AnalyseChoreographer = (nodeVOS: INodeVOSItem[]): GraphData => {
  const dom = document.createElement('div');
  dom.id = 'analyse_choreographer';
  dom.style.display = 'none';
  const nodeData = {
    nodes: [],
    edges: []
  } as GraphData; // 编导路径图

  // 第一步 得到块内开始节点id 和 结束节点id
  const _nodeVOS = nodeVOS.map(node => {
    if (node.content) {
      dom.innerHTML = node.content;
      const nodes = AnalyseGsEditor(dom);
      return { ...node, nodeFirstId: nodes[0].id, nodes, nodeLastId: nodes[nodes.length - 1].id }
    } else {
      return { ...node, nodes: [], nodeFirstId: '', nodeLastId: '' }
    }
  })
  // 第二步 options的nextNodeId和previousNodeId 替换成块的开始结束节点的id
  _nodeVOS.forEach(node => {
    if (Array.isArray(node.options) && node.options.length > 0) {
      node.options.forEach(opt => {
        const item = _nodeVOS.find(val => val.id === opt.nextNodeId)
        opt.nextNodeId = item?.nodeFirstId || '';
        opt.previousNodeId = node.nodeLastId;
      })
    }
  })
  // 第三步 得到所有路径，以及多分支产生的节点 （单个分支会被忽略，仅为联系块与块作用）
  _nodeVOS.forEach(node => {
    const { nodes, options } = node;
    const edgesData = AnalyseEdges(nodes, options)
    nodeData.nodes = nodeData.nodes?.concat([...nodes, ...edgesData.nodes])
    nodeData.edges = nodeData.edges?.concat(edgesData.edges);
  })

  return nodeData;
}

interface IAnalyseEdgesRes {
  edges: EdgeConfig[];
  nodes: ITemplate[] & NodeConfig[];
}
// 分析线路 -- 得出线 + 线产生的一个选项节点
const AnalyseEdges = (resultData: ITemplate[] & NodeConfig[], options: IOptionItem[] = []): IAnalyseEdgesRes => {
  const edges = [] as EdgeConfig[];
  const nodes = [] as NodeConfig[];
  let tempSource = ''
  // 块内部分支按顺序指向
  resultData.forEach((val, ind) => {
    if (ind !== 0) edges.push({ source: String(tempSource), target: String(val.id) } as EdgeConfig);
    tempSource = val.id;
  })
  // 块分支新增一个选项节点 两条edge线
  options.forEach(opt => {
    if (options.length > 1) {
      nodes.push({
        id: String(opt.id),
        info: { ...templateItem(), id: String(opt.id), content: opt.content, type: TemplateTypeEnum.对话分支 },
        label: fittingString(opt.content)
      })
      edges.push({ source: opt.previousNodeId, target: String(opt.id) } as EdgeConfig);
      edges.push({ source: String(opt.id), target: opt.nextNodeId } as EdgeConfig);
    } else {
      edges.push({ source: String(opt.previousNodeId), target: String(opt.nextNodeId) } as EdgeConfig);
    }
  })
  return { edges, nodes } as IAnalyseEdgesRes;
}

// 转换块级别数据产生块内部节点
const AnalyseGsEditor = (dom: HTMLElement): ITemplate[] & NodeConfig[] => {
  // const dom = document.getElementById('editorRefId') as HTMLElement;
  const domNodeArr = Array.prototype.slice.call(dom.childNodes) // NodeList 转换成可操纵数组
  // console.log('dom-----------childNodes--------------->', domNodeArr)
  const sceneRecord = { sceneId: '', sceneNum: '0', sceneContent: '' } // 记录场景信息
  const roleRecord = { roleId: '', roleName: '', emotion: EmotionEnum.无表情 } // 记录角色信息
  const resultData: ITemplate[] & NodeConfig[] = [];

  const refreshRoleRecord = () => {
    roleRecord.roleId = '';
    roleRecord.roleName = '';
    roleRecord.emotion = EmotionEnum.无表情
  }

  domNodeArr.forEach((val: HTMLDivElement) => {
    if (val.className === ClassNameTypeEnumZH.场景) {
      sceneRecord.sceneNum = Number(sceneRecord.sceneNum) + 1 + '';
      sceneRecord.sceneContent = val.innerText;
      sceneRecord.sceneId = val.id;
      refreshRoleRecord()
    }
    if (val.className === ClassNameTypeEnumZH.旁白) {
      resultData.push({
        id: val.id,
        info: { ...templateItem(val.id), ...sceneRecord, ...roleRecord, type: TemplateTypeEnum.旁白, content: val.innerText },
        label: fittingString(val.innerText)
      });
      refreshRoleRecord()
    }
    if (val.className === ClassNameTypeEnumZH.角色) {
      roleRecord.roleId = val.id;
      roleRecord.roleName = val.innerText;
    }
    if (val.className === ClassNameTypeEnumZH.表情) {
      roleRecord.emotion = EmotionEnum[val.innerText];
    }
    if (val.className === ClassNameTypeEnumZH.对话) {
      resultData.push({
        id: val.id,
        info: { ...templateItem(val.id), ...sceneRecord, ...roleRecord, type: TemplateTypeEnum.对话, content: val.innerText },
        label: fittingString(val.innerText)
      });
    }
    if (val.className === ClassNameTypeEnumZH.内心独白) {
      resultData.push({
        id: val.id,
        info: { ...templateItem(), ...sceneRecord, ...roleRecord, type: TemplateTypeEnum.内心独白, content: val.innerText },
        label: fittingString(val.innerText)
      });
    }
  })
  return resultData;
}


// 获取g6数据
export const getG6Data = (nodeVOS: INodeVOSItem[], activeNodeId: string) => {
  const nodes = nodeVOS.map(val => (
    {
      ...val,
      id: String(val.id),
      label: val.nodeName,
      color: activeNodeId === String(val.id) ? 'red' : '#9191fd'
    }
  )) as NodeConfig[];

  const edges = [] as NodeConfig[];
  nodeVOS.forEach(val => {
    // eslint-disable-next-line no-unused-expressions
    val?.options?.forEach(item => {
      edges.push({
        optionId: item.id,
        ...item,
        id: 'edge' + item.id,
        source: String(item.previousNodeId),
        target: String(item.nextNodeId),
        label: fittingString(item.content),
      })
    })
  })
  if (edges.length > 0) {
    return {
      nodes,
      edges
    }
  } else {
    return {
      nodes
    }
  }

}
