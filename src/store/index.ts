import { createStore, createLogger, useStore as baseUseStore, Store } from 'vuex'
import { App, InjectionKey } from 'vue'
import {
  IAppState,
  ICharacterCenterState,
  IChoreographerState,
  IEditorModuleState,
  IUserState
} from '@/store/modules/index.model';
import { IResultState } from "@/store/modules/result.model";

export interface IStore {
  auth: IUserState; // 用户中心
  app: IAppState; // app其他信息
  characterCenter: ICharacterCenterState; // 角色中心
  result: IResultState; // 结果
  choreographer: IChoreographerState; // 编导
  editor: IEditorModuleState; // UGC
}

export const key: InjectionKey<Store<IStore>> = Symbol('workplatform')

const store: Store<IStore | unknown> = createStore({
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [], // 在开发环境中开启logger
  strict: process.env.NODE_ENV !== 'production' // 严格模式
})

export default store;

export function useStore (): Store<IStore> {
  return baseUseStore(key)
}

export function setupStore (app: App): void {
  app.use(store, key)
}

export type RootState = Store<IStore | unknown>
export type AppDispatch = ReturnType<typeof store.dispatch>
