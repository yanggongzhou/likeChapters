import Service from '@/utils/request';
import { TemplateTypeEnum } from "@/store/modules/result.model";
import { EBoolean } from "@/interfaces/common.interfaces";

/**
 * 剧本所在书籍 联想词
 * @param bookId 书籍id
 */
export const AssociationalWord = async (bookId: string) => {
  return await Service.post('/script-editor/entry/4013', { bookId })
}

export interface IAddNodeParam {
  bookId: string | number;
  chapterId: string | number;
  nodeName: string; // 节点名称
  content?: string; // 节点内容
  nodeIntro?: string; // 节点简述
  startNode: EBoolean; // 是否起始节点
  totalNum?: number; // 总字数
}

/**
 * 新增保存节点/块
 * @param param 参数
 */
export const AddNode = async (param: IAddNodeParam) => {
  return await Service.post('/script-editor/entry/4027', param)
}

/**
 * 章节node版列表
 * @param bookId 书籍id
 * @param chapterId 章节id
 */
export const ListChapterNode = async (bookId: string | number, chapterId: string | number) => {
  return await Service.post('/script-editor/entry/4028', { bookId, chapterId })
}

export interface IEditNodeParam extends IAddNodeParam{
  id: string | number; // 节点id
}

/**
 * 编辑保存节点/块
 * @param param 参数
 */
export const EditNode = async (param: IEditNodeParam) => {
  return await Service.post('/script-editor/entry/4029', param)
}

/**
 * 删除节点/块
 * @param id 节点id
 */
export const DeleteNode = async (id: string | number) => {
  return await Service.post('/script-editor/entry/4030', { id })
}

export interface IAddLineParam {
  bookId: string | number;
  chapterId: string | number;
  previousNodeId: string | number; // 上一节点ID
  nextNodeId: string | number; // 下一节点ID
  content: string; // 选项内容、名称
  optionType: TemplateTypeEnum; // 选项类型 通用分支类型
  free: EBoolean; // 是否免费
  coin?: number; // 钱币
}

/**
 * 新增保存线/选项
 * @param param 参数
 */
export const AddLine = async (param: IAddLineParam) => {
  return await Service.post('/script-editor/entry/4031', param)
}

export interface IEditLineParam extends IAddLineParam{
  id: string | number; // 选项id
}

/**
 * 编辑保存线/选项
 * @param param 参数
 */
export const EditLine = async (param: IEditLineParam) => {
  return await Service.post('/script-editor/entry/4032', param)
}

/**
 * 删除选项
 * @param id 选项id
 */
export const DeleteLine = async (id: string | number) => {
  return await Service.post('/script-editor/entry/4033', { id })
}
