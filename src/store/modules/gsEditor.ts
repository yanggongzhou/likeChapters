import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { INodeVOSItem, IGSEditorModuleState } from '@/store/modules/index.model';
import { AddNode, ListChapterNode } from "@/api/gsEditor";
import storyBus from "@/utils/storyBus";
import { getG6Data, getGuid } from "@/utils/resultModule";
import { EBoolean } from "@/interfaces/common.interfaces";
import { IBiographyList, ListCharacter, ListScene } from "@/api/characterCenter";
import { ICharacterListItem } from "@/interfaces/character.interfaces";

@Module({
  dynamic: true,
  store,
  name: 'gsEditor',
  namespaced: true
})
class GSEDITOR extends VuexModule implements IGSEditorModuleState {
  public isExpand = false // 是否展开
  public activeNodeId = '' // active的节点id
  public nodeVOS = [] as INodeVOSItem[]; // 章节的节点选项列表
  public sceneList = [] as IBiographyList[]; // 场景列表
  public characterList = [] as ICharacterListItem[]; // 角色列表

  @Mutation
  private SET_CHARACTERLIST(characterList: ICharacterListItem[]) {
    this.characterList = characterList

  }

  @Mutation
  private SET_SCENELIST(sceneList: IBiographyList[]) {
    this.sceneList = sceneList

  }

  @Mutation
  private SET_ISEXPAND(isExpand: boolean) {
    this.isExpand = isExpand
  }

  @Mutation
  private SET_ACTIVENODEID(activeNodeId: string) {
    this.activeNodeId = activeNodeId
  }

  @Mutation
  private SET_NODEVOSLIST(list: INodeVOSItem[]) {
    this.nodeVOS = list
  }

  @Action
  public SetActiveNodeId(activeNodeId: string) {
    this.SET_ACTIVENODEID(activeNodeId)
  }

  @Action
  public SetIsExpand(isExpand: boolean) {
    this.SET_ISEXPAND(isExpand)
  }

  @Action({ rawError: true })
  public async GetNodeVOSList({ bookId, chapterId }: { bookId: string | number, chapterId: string | number }) {
    const { nodeVOS = [] } = await ListChapterNode(bookId, chapterId)
    if (Array.isArray(nodeVOS) && nodeVOS.length > 0) {
      if (nodeVOS.findIndex(val => String(val.id) === this.activeNodeId) === -1) {
        this.SET_ACTIVENODEID(String(nodeVOS[0].id))
      }
      this.SET_NODEVOSLIST(nodeVOS)
      const g6Data = getG6Data(nodeVOS, this.activeNodeId)
      storyBus.emit('GsEditor/refreshData', g6Data)
    } else {
      await AddNode({
        content: `<p class="sceneheading" id="${getGuid()}"><br></p>`,
        bookId,
        chapterId,
        nodeName: 'new node',
        nodeIntro: '',
        startNode: EBoolean.yes,
        totalNum: 0,
      })
      await this.GetNodeVOSList({ bookId, chapterId })
    }
  }

  @Action
  public async GetSceneList (bookId: string) {
    const { sceneBiographies = [] } = await ListScene(bookId);
    this.SET_SCENELIST(sceneBiographies)
  }

  @Action
  public async GetCharacterList (bookId: string) {
    this.SET_CHARACTERLIST(await ListCharacter(bookId))
  }
}

export const GSEditorModule = getModule(GSEDITOR)
