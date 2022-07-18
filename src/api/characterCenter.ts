import Service from '@/utils/request';
import { ICharacterListItem, ICharacterParams, IDressUpItem } from "@/interfaces/character.interfaces";

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
 * 查询
 * @param id 角色详情ID
 */
export const DetailCharacter = async (id: string) => {
  return await Service.get('/character/detail', { params: { id } })
}

/**
 * 新增形象
 * @param id 角色ID
 * @param dressUpItem 风格名称
 */
export const AddCharacterLook = async ({ id, dressUpItem }: { id: string, dressUpItem: IDressUpItem }) => {
  return await Service.post('/character/look/save', { id, dressUpItem })
}

/**
 * 修改形象
 * @param id 风格ID
 * @param dressUpItem IDressUpItem
 */
export const EditCharacterLook = async ({ id, dressUpItem }: { id: string, dressUpItem: IDressUpItem }) => {
  return await Service.post('/character/look/edit', { id, dressUpItem })
}

/**
 * 删除形象
 * @param id 风格ID
 * @param dressUpItem IDressUpItem
 */
export const DeleteCharacterLook = async ({ id, characterId }: { id: string, characterId: string }) => {
  return await Service.delete('/character/look/delete', { params: { id, characterId } })
}
