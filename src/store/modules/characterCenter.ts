/**
 * @title 角色中心
 * @author yonggz
 */
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import store from '@/store'
import { ICharacterCenterState } from '@/store/modules/index.model';
import { DetailCharacter } from "@/api/characterCenter";
import { ListMaterial } from "@/api/material";
import { EBoolean } from "@/interfaces/common.interfaces";
import { LookTypeEnum, MaterialTypeEnum } from "@/interfaces/material.interfaces";
import { ICharacterListItem, IDressUpItem } from "@/interfaces/character.interfaces";

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
  public dressUpItem = {
    id: '',
    isDefault: EBoolean.no,
    name: '',
    skin: { id: '', url: '', },
    cloth: { id: '', url: '', },
    emotion: { id: '', url: '', },
    hair: { id: '', url: '', },
    backext: { id: '', url: '', },
  }

  // 角色详情
  public characterDetail = {} as ICharacterListItem

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
  private SET_CHARACTERDETAIL(res: ICharacterListItem) {
    this.characterDetail = { ...res }
  }

  @Mutation
  private SET_LOOKTYPE(lookType: LookTypeEnum) {
    this.lookType = lookType
  }

  @Mutation
  private SET_DRESSUPITEM({ id, url }: { id: string, url: string }) {
    console.log('this.dressUpItem[LookTypeEnum[this.lookType]]', LookTypeEnum[this.lookType],this.dressUpItem[LookTypeEnum[this.lookType]])
    // 再次点击清空
    if (this.dressUpItem[LookTypeEnum[this.lookType]]?.id) {
      this.dressUpItem[LookTypeEnum[this.lookType]] = { id: '', url: '' }
    } else {
      this.dressUpItem[LookTypeEnum[this.lookType]] = { id, url }
    }
  }

  @Mutation // 角色风格点击切换
  private REPLACE_STYLEITEM(item: IDressUpItem) {
    this.dressUpItem = JSON.parse(JSON.stringify(item));
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
    console.log('lookType----------------------------->', LookTypeEnum)
    this.SET_LOOKTYPE(lookType)
  }

  @Action({ rawError: true }) // 设置服装选项组合
  public SetDressUpItem({ id, url }: { id: string, url: string }) {
    this.SET_DRESSUPITEM({ id, url })
  }

  @Action // 设置服装选项组合
  public ReplaceStyleItem(item: IDressUpItem) {
    this.REPLACE_STYLEITEM(item)
  }

  @Action // 设置角色详情
  public async SetCharacterDetail({ characterId, isMounted }: { characterId: string, isMounted: boolean }) {
    const res = await DetailCharacter(characterId)
    this.SET_CHARACTERDETAIL(res)
    if (res.dressUp && res.dressUp.length > 0) {
      this.ReplaceStyleItem(res.dressUp[0]);
    }
    if (isMounted) {
      this.SET_ISSHOWSTYLEMANAGEMENT(res.dressUp && res.dressUp.length > 0)
    }
  }

  @Mutation
  private RESET_LOOKTYPE() {
    this.lookType = LookTypeEnum.skin;
  }

  @Mutation
  private RESET_DRESSUPITEM() {
    this.dressUpItem = {
      id: '',
      isDefault: EBoolean.no,
      name: '',
      skin: { id: '', url: '', },
      cloth: { id: '', url: '', },
      emotion: { id: '', url: '', },
      hair: { id: '', url: '', },
      backext: { id: '', url: '', },
    }
  }

  @Action
  public ResetCharacterCenter() {
    this.RESET_LOOKTYPE()
    this.RESET_DRESSUPITEM()
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
    this.SET_MATERIALVOS(data);
  }

}

export const CharacterCenterModule = getModule(CharacterCenter)
