import { App } from 'vue'
import * as ElementIcon from '@element-plus/icons-vue'
import DzTable from '@/components/table/index.vue'
import DzDialog from '@/components/DzDialog/index.vue'
/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents (app: App) {
  // app.component(SvgIcon.name, SvgIcon)
  Object.keys(ElementIcon).forEach(key => {
    app.component(key, ElementIcon[key as keyof typeof ElementIcon])
  })
  app.component('DzTable', DzTable)

  app.component('DzDialog', DzDialog)
}
