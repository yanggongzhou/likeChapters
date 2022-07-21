import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IEditorModuleState } from '@/store/modules/index.model';
import { INodeItem, ISceneItem } from "@/interfaces/editor.interfaces";
import { ListNode } from "@/api/editor";
import storyBus from "@/utils/storyBus";
import { AnalyseEditorData } from "@/utils/resultModule";

@Module({
  dynamic: true,
  store,
  name: 'editor',
  namespaced: true
})
class EDITOR extends VuexModule implements IEditorModuleState {
  public isExpand = false // 是否展开
  public activeNodeId = '' // active的节点id
  public nodeList = [] as Array<INodeItem>;
  public nodeItem = {} as INodeItem;
  public sceneItem = {} as ISceneItem;

  @Mutation
  private SET_ISEXPAND(isExpand: boolean) {
    this.isExpand = isExpand
  }

  @Mutation
  private SET_ACTIVENODEID(activeNodeId: string) {
    this.activeNodeId = activeNodeId;
  }
  @Action
  public SetActiveNodeId(activeNodeId: string) {
    this.SET_ACTIVENODEID(activeNodeId);
    const _nodeItem = this.nodeList.find(val => val.id === activeNodeId);
    if (_nodeItem) {
      this.SET_NODEITEM(_nodeItem);
    } else {
      throw new Error('未查询到相应节点')
    }
  }

  @Action
  public SetIsExpand(isExpand: boolean) {
    this.SET_ISEXPAND(isExpand)
  }

  // 设置输出
  @Mutation
  private SET_NODEITEM(res: INodeItem) {
    this.nodeItem = JSON.parse(JSON.stringify(res));
  }

  @Mutation
  private SET_RESULT(res: INodeItem[]) {
    this.nodeList = JSON.parse(JSON.stringify(res));
  }

  @Mutation
  private SET_SCENEITEM(sceneItem: ISceneItem) {
    this.sceneItem = { ...sceneItem }
  }

  @Action
  public SetSceneItem(sceneItem: ISceneItem) {
    this.SET_SCENEITEM(sceneItem)
  }

  @Action
  public async Init({ bookId, chapterId }: { bookId: string, chapterId: string }) {
    const list = await ListNode(bookId, chapterId);
    this.SET_RESULT(list);
    this.SET_NODEITEM(list[0]);
    this.SetActiveNodeId(list[0].id as string);
    const g6EditorData = AnalyseEditorData(list);
    storyBus.emit('EditorModule/refreshData', g6EditorData)
  }
}

export const EditorModule = getModule(EDITOR)
