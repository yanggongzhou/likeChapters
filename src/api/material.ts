import Service from "@/utils/request";

/**
 * 素材分类列表
 */
export const ListMaterialType = async () => {
  return await Service.post('/script-editor/entry/4040')
}

export interface IListMaterialParam {
  materialOneType?: number;
  materialTwoType?: number;
  materialThreeType?: number
}
/**
 * 获取素材列表
 * @param materialOneType 一级分类 look bg bgm
 * @param materialTwoType 二级分类 body
 * @param materialThreeType 三级分类 hair...
 */
export const ListMaterial = async ({ materialOneType, materialTwoType, materialThreeType }: IListMaterialParam) => {
  return await Service.post('/script-editor/entry/4019', { materialOneType, materialTwoType, materialThreeType })
}
