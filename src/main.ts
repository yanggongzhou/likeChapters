import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupStore } from './store'
import reportWebVitals from './reportWebVitals'
import { setupCustomComponents, setupDirectives, setupGlobalMethods } from './plugins'
import 'normalize.css'
import '@/assets/css/main.css'
import ElementPlus from 'element-plus'
import type { ElForm } from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/css/customElement.less'
import '@/assets/css/iconfont.css'
import i18n from '@/lang'

export type FormInstance = InstanceType<typeof ElForm>

const app = createApp(App)
app.use(ElementPlus, { i18n: i18n.global.t });
app.use(i18n)

// // 注册全局自定义组件,如：<svg-icon />
setupCustomComponents(app)
// 注册全局自定义指令，如：v-permission权限指令
setupDirectives(app)
// 注册全局方法，如：app.config.globalProperties.$message = message
setupGlobalMethods(app)
// 挂载vuex状态管理
setupStore(app)
// 挂载路由
setupRouter(app)
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount('#app'))

// createApp(App).use(router).mount('#app')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(process.env.NODE_ENV !== 'production' ? console.log : undefined)
