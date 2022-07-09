import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import { ChangeUserInfo, login, UserInfo } from '@/api/login';
import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  removeUserId,
  setUserId
} from '@/utils/cookies';
import store from '@/store';
import { ILoginForm } from '@/views/login/index.model';
import { IUserInfo, IUserState } from '@/store/modules/index.model';

@Module({
  dynamic: true,
  store,
  name: 'user'
})
class USER extends VuexModule implements IUserState {
  public token = getToken();
  public userInfo = {} as IUserInfo;
  public userId = getUserId();
  public permission = [] as string[];

  @Mutation
  private SET_TOKEN(userId: string, token: string) {
    this.token = token;
    this.userId = userId;
  }

  @Mutation
  private SET_USERINFO(user: IUserInfo) {
    this.userInfo = user;
  }

  @Mutation
  private RESET_STATE() {
    this.userId = void 0;
    removeUserId();
    this.token = void 0;
    removeToken();
    this.userInfo = {} as IUserInfo;
  }

  @Mutation
  private SET_PERMISSION(permission: string[] = []) {
    this.permission = permission
  }

  @Action
  public async Login({ userName, password }: ILoginForm) {
    this.RESET_STATE();
    const { userId, userToken } = await login({ userName: userName.trim(), password });
    setToken(userToken);
    setUserId(userId);
    this.SET_TOKEN(userId, userToken);
    // await this.GetUserInfo();
  }

  @Action
  public async Logout() {
    // await logout(this.userId);
    this.RESET_STATE(); // must remove  token  first
    location.reload();
  }

  @Action
  public async GetUserInfo() {
    const res: IUserInfo = await UserInfo();
    this.SET_USERINFO(res);
  }

  @Action
  public ResetToken() {
    this.RESET_STATE();
  }

  @Action
  public SetPermission () {
    this.SET_PERMISSION([])
    // const res: string[] = await permission();
    // this.SET_PERMISSION(res)
  }
}

export const UserModule = getModule(USER);
