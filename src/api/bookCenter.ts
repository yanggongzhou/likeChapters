import Service from '@/utils/request';
import { IBookParams } from "@/views/bookCenter/book/index.model.ts";
/**
 * 书籍列表
 */
export const ListBook = async () => {
  return await Service.get('/book/list')
}
/**
 * 新增书籍
 */
export const AddBook = async (param: IBookParams) => {
  return await Service.post('/book/save', param)
}
/**
 * 删除书籍
 * @param id 书籍id
 */
export const DeleteBook = async (id: string) => {
  return await Service.delete('/book/delete', { params: { id } })
}
/**
 * 编辑书籍
 */
export const EditBook = async (param: IBookParams) => {
  return await Service.post('/book/edit', param)
}
/**
 * 书籍详情
 */
export const DetailBook = async (id: string) => {
  return await Service.get('/book/detail', { params: { id } })
}

export const UploadImg = async (param: FormData) => {
  return await Service.post('/script-editor/imgUtil/contentSaveImg', param)
}

export interface IChapterForm {
  id?: string | number;
  bookId?: string | number;
  chapterName: string;
  chapterIntro?: string;
}
/**
 * 添加章节
 * @param param 参数 IChapterForm
 */
export const AddChapter = async (param: IChapterForm) => {
  return await Service.post('/script-editor/entry/4007', param)
}
/**
 * 修改章节
 * @param param 参数 IChapterForm
 */
export const EditChapter = async (param: IChapterForm) => {
  return await Service.post('/script-editor/entry/4017', param)
}
/**
 * 删除章节
 * @param id 章节id
 */
export const DeleteChapter = async (id: string | number) => {
  return await Service.post('/script-editor/entry/4012', { id })
}
/**
 * 章节列表
 * @param bookId 书籍id
 */
export const ListChapter = async (bookId: string | number) => {
  return await Service.post('/script-editor/entry/4009', { bookId })
}

// export function ChangeUserInfo (data) {
//   return Vue.prototype.$axios.post('/script-editor/entry/4003', data)
// }

export interface IScriptParam {
  id: string | number;
  chapterContent: HTMLDivElement | string;
  totalNum: number;
}
/**
 * 保存剧本
 * @param param 参数 IScriptParam
 */
export const SaveScriptContent = async (param: IScriptParam) => {
  return await Service.post('/script-editor/entry/4008', param)
}

/**
 * 剧本所在章节详情
 * @param id 章节id
 */
export const DetailScript = async (id: string) => {
  return await Service.post('/script-editor/entry/4010', { id })
}
