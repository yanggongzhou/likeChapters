import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { HomeNavActiveType, IAppState, LanguageType } from '@/store/modules/index.model';
import { getLanguage, setLanguage } from "@/utils/cookies";

@Module({
  dynamic: true,
  store,
  name: 'app'
})
class App extends VuexModule implements IAppState {
  public language = getLanguage() || LanguageType.中文;
  public homeNavActive = HomeNavActiveType.authorCenter

  @Mutation
  private SET_LANGUAGE(language: LanguageType) {
    this.language = language
  }

  @Mutation
  private SET_HOMENAVACTIVE(homeNavActive: HomeNavActiveType) {
    this.homeNavActive = homeNavActive
  }

  @Action
  public SetLanguage (language: LanguageType) {
    setLanguage(language)
    this.SET_LANGUAGE(language)
  }

  @Action
  public SetHomeNavActive (homeNavActive: HomeNavActiveType) {
    this.SET_HOMENAVACTIVE(homeNavActive)
  }
}

export const AppModule = getModule(App)
