import Service from '@/utils/request';
import { EBoolean } from "@/interfaces/common.interfaces";
import { ICharacterListItem, ICharacterParams, IDressUpItem, SexType } from "@/interfaces/character.interfaces";

export interface IBiographyForm {
  id?: string | number;
  bookId?: string | number;
  biographyName?: string;
  biographyIntro?: string;
  biographyImg?: string;
  sex?: SexType;
  mainCharacter?: EBoolean;
}
/**
 * 添加角色
 * @param param 参数 IBiographyForm
 */
export const AddCharacter = async (param: ICharacterParams) => {
  return await Service.post('/character/save', { ...param })
}
/**
 * 编辑角色
 * @param param 参数 IBiographyForm
 */
export const EditCharacter = async (param: ICharacterParams) => {
  return await Service.post('/character/edit', { ...param })
}
/**
 * 获取人物列表
 * @param bookId 书籍Id
 */
export const ListCharacter = async (bookId: string): Promise<ICharacterListItem[]> => {
  return await Service.get('/character/list', { params: { bookId } })
}

/**
 * 删除角色
 * @param id 角色id
 */
export const DeleteCharacter = async (id: string) => {
  return await Service.delete('/character/delete', { params: { id } })
}

/**
 * 新增风格
 * @param id 角色ID
 * @param dressUpItem 风格名称
 */
export const AddCharacterLook = async ({ id, dressUpItem }: { id: string, dressUpItem: IDressUpItem }) => {
  return await Service.post('/character/look/save', { id, dressUpItem })
}

/**
 * 修改
 * @param id 风格ID
 * @param biographyId: 角色Id
 * @param styleName 风格名称
 * @param defaultStyle 是否默认风格 0 1
 * @param material 角色id 逗号分割
 */
export const EditCharacterLook = async ({ id, dressUpItem }: { id: string, dressUpItem: IDressUpItem }) => {
  return await Service.post('/character/look/edit', { id, dressUpItem })
}

/**
 * 获取素材
 */
export const ListClothStyle = async () => {
  return await Service.post('/script-editor/entry/4019')
}

export interface IAddStyleParam {
  biographyId: string;
  styleName: string;
  defaultStyle: EBoolean;
  material: string;
}
/**
 * 新增风格
 * @param biographyId 角色
 * @param styleName 风格名称
 * @param defaultStyle 是否默认风格 0 1
 * @param material 角色id
 */
export const AddStyle = async ({ biographyId, styleName, defaultStyle, material }: IAddStyleParam) => {
  return await Service.post('/script-editor/entry/4021', {
    biographyId, styleName, defaultStyle, material
  })
}

/**
 * 修改
 * @param id 风格ID
 * @param biographyId: 角色Id
 * @param styleName 风格名称
 * @param defaultStyle 是否默认风格 0 1
 * @param material 角色id 逗号分割
 */
export const EditStyle = async ({ id, biographyId, styleName, defaultStyle, material }: IAddStyleParam & {id: string}) => {
  return await Service.post('/script-editor/entry/4022', { id, biographyId, styleName, defaultStyle, material })
}


export interface IBiographyList {
  id: string | number;
  bookId: string | number;
  biographyName: string;
  biographyIntro: string;
}
/**
 * 获取场景列表
 * @param bookId 书籍Id
 */
export const ListScene = async (bookId: string) => {
  return await Service.post('/script-editor/entry/4038', { bookId })
}
/**
 * 编辑场景
 * @param param 参数 IBiographyForm
 */
export const EditScene = async (param: IBiographyForm) => {
  return await Service.post('/script-editor/entry/4039', { ...param })
}

/**
 * 查询
 * @param id 角色详情ID
 */
export const DetailCharacter = async (id: string) => {
  return await Service.get('/character/detail', { params: { id } })
}
