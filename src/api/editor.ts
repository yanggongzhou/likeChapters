import Service from '@/utils/request';
import { SceneItemDto } from "@/utils/resultModule";
import { INodeItem, ISceneItem } from "@/interfaces/editor.interfaces";

/**
 * 章节node列表
 * @param params
 */
export const ListScene = async (params: { bookId: string; chapterId: string; nodeId: string; }): Promise<ISceneItem[]> => {
  return await Service.get('/scene/list', { params: params })
}

/**
 * 新增保存节点/块
 * @param param 参数
 */
export const AddScene = async (param: ISceneItem) => {
  return await Service.post('/node/scene/save', param)
}

/**
 * 编辑保存节点/块
 * @param param 参数
 */
export const EditScene = async (param: ISceneItem) => {
  return await Service.put('/node/scene/edit', param)
}

/**
 * 删除节点/块
 * @param params
 */
export const DeleteScene = async (params: { id: string; nodeId: string }) => {
  return await Service.delete('/node/scene/delete', { params })
}

/**
 * 章节node子节点列表
 * @param bookId 书籍id
 * @param chapterId 章节id
 */
export const ListNode = async (bookId: string, chapterId: string): Promise<INodeItem[]> => {
  return await Service.get('/node/list', { params: { bookId, chapterId } })
}

/**
 * 新增保存子节点
 * @param param 参数
 */
export const AddNode = async (param: INodeItem) => {
  return await Service.post('/node/save', param)
}

/**
 * 编辑保存子节点
 * @param param 参数
 */
export const EditNode = async (param: INodeItem) => {
  return await Service.put('/node/edit', param)
}

/**
 * 删除子节点
 * @param id 子节点id
 */
export const DeleteNode = async (id: string) => {
  return await Service.delete('/node/delete', { params: { id } })
}
