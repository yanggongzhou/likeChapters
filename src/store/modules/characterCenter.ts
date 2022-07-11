/**
 * @title 角色中心
 * @author yonggz
 */
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { ICharacterCenterState, ICharacterDetail, IStyles } from '@/store/modules/index.model';
import { DetailCharacter } from "@/api/characterCenter";
import { ListMaterial } from "@/api/material";
import { EBoolean } from "@/interfaces/common.interfaces";
import { LookTypeEnum, MaterialTypeEnum } from "@/interfaces/material.interfaces";

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
  public lookType = LookTypeEnum.skin;
  // 类型列表
  // 三级类型素材
  public materialVOS = [];
  // 当前选择的BGM
  public bgm = '';
  // 当前选择的background
  public background = '';

  // 服装选项组合
  public selectStyleItem = {
    id: '',
    defaultStyle: EBoolean.no,
    materialName: '',
    materialVOS: [
      { id: '', lookType: LookTypeEnum.skin, materialUrl: '', },
      { id: '', lookType: LookTypeEnum.emotion, materialUrl: '', },
      { id: '', lookType: LookTypeEnum.hair, materialUrl: '', },
      { id: '', lookType: LookTypeEnum.cloth, materialUrl: '', },
      { id: '', lookType: LookTypeEnum.backext, materialUrl: '', },
    ],
  }

  // 角色详情
  public characterDetail = {} as ICharacterDetail

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
  private SET_LOOKTYPE(lookType: LookTypeEnum) {
    this.lookType = lookType
  }

  @Mutation
  private SET_SELECTSTYLEITEM({ id, url }: { id: string, url: string }) {
    if (!this.selectStyleItem.materialVOS) this.selectStyleItem.materialVOS = []
    // 再次点击清空
    const index = this.selectStyleItem.materialVOS.findIndex(val => (val.lookType === this.lookType))
    if (index !== -1 && id === this.selectStyleItem.materialVOS[index]?.id) {
      this.selectStyleItem.materialVOS[index] = { ...this.selectStyleItem.materialVOS[index], id: '', materialUrl: '' }
    } else {
      if (index !== -1) {
        this.selectStyleItem.materialVOS[index] = { ...this.selectStyleItem.materialVOS[index], id, materialUrl: url }
      } else {
        this.selectStyleItem.materialVOS.push({ id, lookType: this.lookType, materialUrl: url });
      }
    }
  }

  @Mutation // 角色风格点击切换
  private REPLACE_STYLEITEM(item: IStyles) {
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
  public SetLookType(lookType: LookTypeEnum) {
    this.SET_LOOKTYPE(lookType)
  }

  @Action({ rawError: true }) // 设置服装选项组合
  public SetSelectStyleItem({ id, url }: { id: string, url: string }) {
    this.SET_SELECTSTYLEITEM({ id, url })
  }

  @Action // 设置服装选项组合
  public ReplaceStyleItem(item: IStyles) {
    this.REPLACE_STYLEITEM(item)
  }

  @Action // 设置角色详情
  public async SetCharacterDetail({ characterId, isMounted }: { characterId: string, isMounted: boolean }) {
    const res = await DetailCharacter(characterId)
    this.SET_CHARACTERDETAIL(res)
    if (res.styles && res.styles.length > 0) {
      this.ReplaceStyleItem(res.styles[0]);
    }
    if (isMounted) {
      this.SET_ISSHOWSTYLEMANAGEMENT(res.styles && res.styles.length > 0)
    }
  }

  @Mutation
  private RESET_LOOKTYPE() {
    this.lookType = LookTypeEnum.skin;
  }

  @Mutation
  private RESET_SELECTSTYLEITEM() {
    this.selectStyleItem = {
      id: '',
      defaultStyle: EBoolean.no,
      materialName: '',
      materialVOS: [
        { id: '', lookType: LookTypeEnum.skin, materialUrl: '', },
        { id: '', lookType: LookTypeEnum.emotion, materialUrl: '', },
        { id: '', lookType: LookTypeEnum.hair, materialUrl: '', },
        { id: '', lookType: LookTypeEnum.cloth, materialUrl: '', },
        { id: '', lookType: LookTypeEnum.backext, materialUrl: '', },
      ],
    }
  }

  @Action
  public ResetCharacterCenter() {
    this.RESET_LOOKTYPE()
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
    const data = await ListMaterial({ materialType: MaterialTypeEnum.look })
    console.log('materialVOS------------------------>', data)
    this.SET_MATERIALVOS(data);
  }

}

export const CharacterCenterModule = getModule(CharacterCenter)
