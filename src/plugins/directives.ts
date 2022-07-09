import { App, Directive } from 'vue'
// import { waves } from '@/plugins/directives/waves';
import * as directivesHub from './directivesHub'
import { vLoading } from 'element-plus/es/components/loading/src/directive';
/**
 * 注册全局自定义指令
 * @param app
 */
export function setupDirectives (app: App) {
  // app.directive('waves', waves)
  Object.keys(directivesHub).forEach(key => {
    app.directive(key, (directivesHub as { [key: string ]: Directive })[key])
  })
  app.directive('load', vLoading)
}
