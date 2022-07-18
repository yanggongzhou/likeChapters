import { LookTypeEnum, MaterialTypeEnum } from "@/interfaces/material.interfaces";
import { ICharacterListItem, IDressUpItem } from "@/interfaces/character.interfaces";
import { INodeItem, ISceneItem } from "@/interfaces/editor.interfaces";

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

// UGC编辑
export interface IEditorModuleState {
  isExpand: boolean;
  activeNodeId?: string;
  nodeList: INodeItem[];
  nodeItem: INodeItem;
  sceneList: ISceneItem[];
  sceneItem: ISceneItem;
}
