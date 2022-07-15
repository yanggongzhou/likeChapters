import { EBoolean } from "@/interfaces/common.interfaces";
import { LookTypeEnum, MaterialTypeEnum } from "@/interfaces/material.interfaces";
import { ICharacterListItem, IDressUpItem } from "@/interfaces/character.interfaces";
import { INodeItem, ISceneItem, TemplateTypeEnum } from "@/interfaces/editor.interfaces";

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
}

export interface ICharacterCenterState {
  isShowStyleManagement: boolean;
  lookType: LookTypeEnum;
  materialType: MaterialTypeEnum;
  dressUpItem: IDressUpItem;
  characterDetail: ICharacterListItem;
  bgm: string | number;
  background: string | number;
  materialVOS: any;
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

// 编导
export interface IChoreographerState {
  activeNodeId?: string | number;
  nodeVOS: INodeVOSItem[];
  chatInfo: ISceneItem[];
}

// UGC编辑
export interface IEditorModuleState {
  isExpand: boolean;
  activeNodeId?: string;
  nodeList: INodeItem[];
  nodeItem: INodeItem;
  sceneItem: ISceneItem;
}
