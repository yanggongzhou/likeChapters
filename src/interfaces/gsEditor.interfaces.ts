export enum EAttribute {
  场景 = 'SCENE',
  旁白 = 'NARRATOR',
  角色 = 'FIGURE',
  表情 = 'EXPRESSION',
  对话 = 'DIALOG',
  内心独白 = 'MONOLOGUE',
  镜头 = 'SHOT',
}

export const ClassNameOption = {
  [EAttribute.场景]: 'sceneheading',
  [EAttribute.旁白]: 'narrator',
  [EAttribute.角色]: 'character',
  [EAttribute.表情]: 'expression',
  [EAttribute.对话]: 'dialog',
  [EAttribute.内心独白]: 'monologue',
}
