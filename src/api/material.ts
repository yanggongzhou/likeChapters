import Service from "@/utils/request";
import { IMaterialListItem, MaterialTypeEnum, LookTypeEnum, IMaterialParams } from "@/interfaces/material.interfaces";

/**
 * 获取素材列表
 */
export const ListMaterial = async ({ materialType = MaterialTypeEnum.look, lookType }: { materialType: MaterialTypeEnum, lookType?: LookTypeEnum}): Promise<IMaterialListItem[]> => {
  return await Service.get('/material/list', { params: { materialType, lookType } })
}

/**
 * 创建素材
 */
export const AddMaterial = async (params: IMaterialParams): Promise<IMaterialListItem> => {
  return await Service.post('/material/save', params)
}

/**
 * 编辑素材
 */
export const EditMaterial = async (params: IMaterialParams): Promise<IMaterialListItem> => {
  return await Service.post('/material/edit', params)
}
