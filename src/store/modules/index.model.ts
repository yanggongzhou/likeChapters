import { IBiographyForm, IBiographyList } from "@/api/characterCenter";
import { ITemplate, TemplateTypeEnum } from "@/store/modules/result.model";
import { EBoolean } from "@/interfaces/common.interfaces";
import { LookTypeEnum, MaterialTypeEnum } from "@/interfaces/material.interfaces";

// user
export interface IUserState {
  token?: string;
  userId?: string;
  userInfo: IUserInfo | undefined;
  permission: string[];
}

export interface IUserInfo {
  avatar?: string;
  nickName: string;
  userId: string;
  userName: string;
}

// app
export interface IAppState {
  language: LanguageType;
  homeNavActive: HomeNavActiveType;
}

export enum LanguageType {
  en = 'en',
  中文 = 'zh-cn'
}

export enum HomeNavActiveType {
  authorCenter = '1',
  materialCenter = '2',
  choreographerCenter = '3'
}

// characterCenter
export enum ClothTypeEnum {
  body = 'BODY',
  skin = 'SKIN',
  faceType = 'FACETYPE',
  hair = 'HAIR',
  clothes = 'CLOTHES',
  jewelry = 'JEWELRY'
}

export interface IMaterialVOS {
  id?: string;
  lookType: LookTypeEnum;
  materialUrl: string;
}

export interface ICharacterDetail extends IBiographyForm {
  styles: IStyles[]
}

export interface IStyles {
  id?: string;
  defaultStyle: EBoolean;
  materialName?: string;
  materialVOS?: IMaterialVOS[];
}

export interface ICharacterCenterState {
  isShowStyleManagement: boolean;
  lookType: LookTypeEnum;
  materialType: MaterialTypeEnum;
  selectStyleItem: IStyles;
  characterDetail: ICharacterDetail;
  bgm: string | number;
  background: string | number;
  materialVOS: any;
}

// GSEditor
export enum ClassNameTypeEnum {
  sceneheading = 1,
  narrator = 2,
  character,
  expression,
  dialog,
  monologue,
}

export enum ClassNameTypeListEnum {
  SceneHeading = ClassNameTypeEnum.sceneheading,
  Narration = ClassNameTypeEnum.narrator,
  Character = ClassNameTypeEnum.character,
  Expression = ClassNameTypeEnum.expression,
  Dialog = ClassNameTypeEnum.dialog,
  Monologue = ClassNameTypeEnum.monologue
}
export enum ClassNameTypeEnumZH {
  场景 = 'sceneheading',
  旁白 = 'narrator',
  角色 = 'character',
  表情 = 'expression',
  对话 = 'dialog',
  内心独白 = 'monologue',
}

export interface INode {
  id: string | number;
  bookId: string | number;
  chapterId: string | number;
  chapterName?: string;
  content: string;
  nodeIntro?: string;
  nodeName: string;
  startNode: EBoolean;
  totalNum: number;
  ctime?: number;
  utime: number | undefined;
}

export interface IOptionItem {
  id: string | number;
  bookId: string | number;
  chapterId: string | number;
  content: string;
  ctime?: number;
  utime: number | undefined;
  coin: number;
  free: EBoolean;
  nextNodeId: string | number;
  optionType: TemplateTypeEnum;
  previousNodeId: string | number;
}

export interface INodeVOSItem extends INode {
  options?: IOptionItem[];
}

export interface IGSEditorModuleState {
  isExpand: boolean;
  activeNodeId?: string | number;
  nodeVOS: INodeVOSItem[];

  sceneList: IBiographyList[];
  characterList: IBiographyForm[];

}

// 编导
export interface IChoreographerState {
  activeNodeId?: string | number;
  nodeVOS: INodeVOSItem[];
  chatInfo: ITemplate[];
}
