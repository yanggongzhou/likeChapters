/**
 * @title 角色中心
 * @author yonggz
 */
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import {
  ClothTypeEnum,
  ICharacterCenterState,
  ICharacterDetail,
  IStyles, ITypeData, MaterialTypeEnum
} from '@/store/modules/index.model';
import { GetCharacterDetail } from "@/api/characterCenter";
import { ListMaterial, ListMaterialType } from "@/api/material";
import { EBoolean } from "@/interfaces/common.interfaces";

@Module({
  dynamic: true,
  store,
  name: 'characterCenter'
})
class CharacterCenter extends VuexModule implements ICharacterCenterState {
  // 是否展示衣架
  public isShowStyleManagement = false
  // 素材类型
  public materialType = MaterialTypeEnum.look;
  // 当前服装选项
  public clothType = ClothTypeEnum.body;
  // 类型列表
  public typeData = [] as ITypeData[];
  // 三级类型素材
  public materialVOS = [];
  // 当前选择的BGM
  public bgm = '';
  // 当前选择的background
  public background = '';

  // 服装选项组合
  public selectStyleItem = {
    id: '',
    biographyId: '',
    defaultStyle: EBoolean.no,
    material: '',
    materialVOS: [
      {
        id: NaN,
        materialType: ClothTypeEnum.body,
        materialUrl: '',
      },
      {
        id: NaN,
        materialType: ClothTypeEnum.skin,
        materialUrl: '',
      },
      {
        id: NaN,
        materialType: ClothTypeEnum.faceType,
        materialUrl: '',
      },
      {
        id: NaN,
        materialType: ClothTypeEnum.hair,
        materialUrl: '',
      },
      {
        id: NaN,
        materialType: ClothTypeEnum.clothes,
        materialUrl: '',
      },
      {
        id: NaN,
        materialType: ClothTypeEnum.jewelry,
        materialUrl: '',
      },
    ],
  }

  // 角色详情
  public characterDetail = {} as ICharacterDetail

  @Mutation
  private SET_TYPEDATA(typeData: ITypeData[]) {
    this.typeData = typeData;
  }

  @Mutation
  private SET_MATERIALVOS (materialVOS: any) {
    this.materialVOS = materialVOS;
  }

  @Mutation
  private SET_BGM(bgm: string) {
    if (this.bgm === bgm) {
      this.bgm = '';
    } else {
      this.bgm = bgm
    }
  }

  @Mutation
  private SET_BG(bg: string) {
    if (this.background === bg) {
      this.background = '';
    } else {
      this.background = bg
    }
  }

  @Mutation
  private SET_MATERIALTYPE(materialType: MaterialTypeEnum) {
    this.materialType = materialType
  }

  @Mutation
  private SET_ISSHOWSTYLEMANAGEMENT(isShowStyleManagement: boolean) {
    this.isShowStyleManagement = isShowStyleManagement
  }

  @Mutation
  private SET_CHARACTERDETAIL(res: ICharacterDetail) {
    this.characterDetail = { ...res }
  }

  @Mutation
  private SET_CLOTHTYPE(clothType: ClothTypeEnum) {
    this.clothType = clothType
  }

  @Mutation
  private SET_SELECTSTYLEITEM({ id, url }: { id: number, url: string }) {
    if (!this.selectStyleItem.materialVOS) this.selectStyleItem.materialVOS = []
    // 再次点击清空
    const index = this.selectStyleItem.materialVOS.findIndex(val => (val.materialType === this.clothType))
    if (index !== -1 && id === this.selectStyleItem.materialVOS[index].id) {
      this.selectStyleItem.materialVOS[index] = { ...this.selectStyleItem.materialVOS[index], id: NaN, materialUrl: '' }
    } else {
      if (index !== -1) {
        this.selectStyleItem.materialVOS[index] = { ...this.selectStyleItem.materialVOS[index], id, materialUrl: url }
      } else {
        this.selectStyleItem.materialVOS.push({ id, materialType: this.clothType, materialUrl: url });
      }
    }
  }

  @Mutation // 角色风格点击切换
  private REPLACE_STYLEITEM(item: IStyles) {
    // this.clothTypeList.forEach(clothType => {
    //   if (item.materialVOS && item.materialVOS.findIndex(val => val.materialType === clothType.value) === -1) {
    //     item.materialVOS.push({
    //       id: NaN,
    //       materialType: clothType.value,
    //       materialUrl: '',
    //     })
    //   }
    // })
    this.selectStyleItem = JSON.parse(JSON.stringify(item));
  }

  @Action // 素材类型
  public SetMaterialType(materialType: MaterialTypeEnum) {
    this.SET_MATERIALTYPE(materialType)
  }

  @Action // 是否展示衣架
  public SetIsShowStyleManagement(isShowStyleManagement: boolean) {
    this.SET_ISSHOWSTYLEMANAGEMENT(isShowStyleManagement)
  }

  @Action // 设置当前服装选项
  public SetClothType(clothType: ClothTypeEnum) {
    this.SET_CLOTHTYPE(clothType)
  }

  @Action({ rawError: true }) // 设置服装选项组合
  public SetSelectStyleItem({ id, url }: { id: number, url: string }) {
    this.SET_SELECTSTYLEITEM({ id, url })
  }

  @Action // 设置服装选项组合
  public ReplaceStyleItem(item: IStyles) {
    this.REPLACE_STYLEITEM(item)
  }

  @Action // 设置角色详情
  public async SetCharacterDetail({ characterId, isMounted }: { characterId: string, isMounted: boolean }) {
    const res = await GetCharacterDetail(characterId)
    this.SET_CHARACTERDETAIL(res)
    if (res.styles && res.styles.length > 0) {
      this.ReplaceStyleItem(res.styles[0]);
    }
    if (isMounted) {
      this.SET_ISSHOWSTYLEMANAGEMENT(res.styles && res.styles.length > 0)
    }
  }

  @Mutation
  private RESET_CLOTHTYPE() {
    this.clothType = ClothTypeEnum.body;
  }

  @Mutation
  private RESET_SELECTSTYLEITEM() {
    this.selectStyleItem = {
      id: '',
      biographyId: '',
      defaultStyle: EBoolean.no,
      material: '',
      materialVOS: [
        {
          id: NaN,
          materialType: ClothTypeEnum.body,
          materialUrl: '',
        },
        {
          id: NaN,
          materialType: ClothTypeEnum.skin,
          materialUrl: '',
        },
        {
          id: NaN,
          materialType: ClothTypeEnum.faceType,
          materialUrl: '',
        },
        {
          id: NaN,
          materialType: ClothTypeEnum.hair,
          materialUrl: '',
        },
        {
          id: NaN,
          materialType: ClothTypeEnum.clothes,
          materialUrl: '',
        },
        {
          id: NaN,
          materialType: ClothTypeEnum.jewelry,
          materialUrl: '',
        },
      ],
    }
  }

  @Action
  public ResetCharacterCenter() {
    this.RESET_CLOTHTYPE()
    this.RESET_SELECTSTYLEITEM()
  }

  @Action // BGM
  public SetBgm(bgm: string) {
    this.SET_BGM(bgm)
  }

  @Action // BG
  public SetBg(bg: string) {
    this.SET_BG(bg)
  }

  @Action //
  public async Init() {
    const { types } = await ListMaterialType()
    this.SET_TYPEDATA(types as ITypeData[]);
    const lookTypeData = this.typeData.filter(val => val.name === MaterialTypeEnum.look)[0]
    const { materialVOS } = await ListMaterial({ materialOneType: lookTypeData.id, materialTwoType: lookTypeData.typeTwos?.[0].id })
    console.log('materialVOS------------------------>', materialVOS)
    this.SET_MATERIALVOS(materialVOS);
  }

}

export const CharacterCenterModule = getModule(CharacterCenter)
