export enum EmotionEnum {
  无表情= 'neutral',
  微笑 = 'smile',
  皱眉 = 'frown',
  挑逗 = 'flirty',
  尴尬 = 'awkward',
  焦虑 = 'nervous',
  震惊 = 'shocked',
  悲伤 = 'sad',
  大笑 = 'laugh',
  害羞 = 'shy',
  Neutral = 'neutral',
  Smile = 'smile',
  Frown = 'frown',
  Flirty = 'flirty',
  Awkward = 'awkward',
  Nervous = 'nervous',
  Shocked = 'shocked',
  Sad = 'sad',
  Laugh = 'laugh',
  Shy = 'shy',
}

export enum TemplateTypeEnum {
  对话 = 'chat',
  旁白 = 'action',
  内心独白 = 'monologue',
  对话分支 = 'select_chat',
  选项 = 'option_chat',
  皮肤分支 = 'select_role_skin',
  头发分支 = 'select_role_hair',
  衣服分支 = 'select_role_cloth',
}
export enum TemplateTypeZhEnum {
  'chat' = '对话',
  'action' = '旁白',
  'monologue' = '内心独白',
  'select_chat' = '对话分支',
  'option_chat' = '选项',
  'select_role_skin' = '皮肤分支',
  'select_role_hair' = '头发分支',
  'select_role_cloth' = '衣服分支',
}

export interface ITemplate {
  sceneNum: string; // 场景编号
  sceneId?: string;
  id: string;
  roleId?: string; // 角色Id role_id
  roleName?: string; // 角色名称
  look?: string; // 装扮类型
  emotion: EmotionEnum; // 表情
  content?: string; // 内容
  type: TemplateTypeEnum; // 节点类型
  end: boolean; // 是否本章重点
  nextId: string; // 下个节点 next_id
  cameraPos: 'center' | 'left' | 'right'; // 镜头 camera_pos
  posId: 'center' | 'left' | 'right'; // 位置 pos_id
  bgmId?: string; // 背景音乐 bgm_id
  sceneBg?: string; // 场景背景名称 scene_bg
  sceneAround?: boolean; // 场景环视，是一个特效 scene_around
  sceneContent?: string; // 场景标题｜内容
  options?: string[], // 对话选项
  selections?: string[], // 服饰选项
}

// result
export interface IResultState {
  result: Array<ITemplate>
}
