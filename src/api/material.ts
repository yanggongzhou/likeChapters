import Service from "@/utils/request";
import { IMaterialListItem, MaterialTypeEnum, LookTypeEnum } from "@/interfaces/material.interfaces";

/**
 * 获取素材列表
 * @param materialType MaterialTypeEnum
 * @param lookType LookTypeEnum
 */
export const ListMaterial = async ({ materialType = MaterialTypeEnum.look, lookType }: { materialType: MaterialTypeEnum, lookType?: LookTypeEnum}): Promise<IMaterialListItem[]> => {
  return await Service.get('/material/list', { params: { materialType, lookType } })
}
