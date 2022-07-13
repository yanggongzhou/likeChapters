import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IEditorModuleState } from '@/store/modules/index.model';
import { ISceneItem } from "@/interfaces/editor.interfaces";
import { SceneItemDto } from "@/utils/resultModule";

@Module({
  dynamic: true,
  store,
  name: 'editor',
  namespaced: true
})
class EDITOR extends VuexModule implements IEditorModuleState {
  public isExpand = false // 是否展开
  public activeNodeId = '' // active的节点id
  public sceneData = [] as Array<ISceneItem>;

  @Mutation
  private SET_ISEXPAND(isExpand: boolean) {
    this.isExpand = isExpand
  }

  @Mutation
  private SET_ACTIVENODEID(activeNodeId: string) {
    this.activeNodeId = activeNodeId
  }

  @Action
  public SetActiveNodeId(activeNodeId: string) {
    this.SET_ACTIVENODEID(activeNodeId)
  }

  @Action
  public SetIsExpand(isExpand: boolean) {
    this.SET_ISEXPAND(isExpand)
  }

  // 设置输出
  @Mutation
  private SET_RESULT(res: ISceneItem[]) {
    this.sceneData = JSON.parse(JSON.stringify(res));
  }

  @Mutation
  private ADD_RESULT(item: SceneItemDto) {
    // this.sceneData.push(item);
  }

  @Mutation
  private UPDATE_RESULT(res: ISceneItem[]) {
    this.sceneData = JSON.parse(JSON.stringify(res));
  }

  @Mutation
  private REMOVE_RESULT(res: ISceneItem[]) {
    this.sceneData = JSON.parse(JSON.stringify(res));
  }

  // 设置输出
  @Action
  public SetResult(res: any) {
    this.SET_RESULT(res)
  }

  @Action // 添加普通对话旁白等消息
  public AddResult() {
    const item = new SceneItemDto();
    // this.ADD_RESULT(item)
    console.log('AddMessage-------->', item)
  }

}

export const EditorModule = getModule(EDITOR)
