import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';
import { IResultState, ITemplate } from "@/store/modules/result.model";

@Module({
  dynamic: true,
  store,
  name: 'result'
})
class RESULT extends VuexModule implements IResultState {
  public result = [] as Array<ITemplate>;

  // 设置输出
  @Mutation
  private SET_RESULT(res: ITemplate[]) {
    this.result = JSON.parse(JSON.stringify(res));
  }

  // 设置输出
  @Action
  public SetResult(res: any) {
    this.SET_RESULT(res)
  }
}

export const ResultModule = getModule(RESULT);
