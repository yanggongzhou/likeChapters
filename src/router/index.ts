import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { App } from 'vue';
import { createRouterGuards } from '@/router/router-guards';
import Layout from '@/components/layout/index.vue'

const constantFiles = require.context('./constantModules', true, /\.ts$/)
let constantModules: Array<RouteRecordRaw> = []
constantFiles.keys().forEach((key) => {
  if (key === './index.ts') return
  constantModules = constantModules.concat(constantFiles(key).default)
})

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/userInfo',
    component: Layout,
    redirect: '/userInfo/profile',
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/profile/index.vue')
      },
    ]
  },
  {
    path: '/error',
    name: 'error',
    component: Layout,
    redirect: '/error/404',
    children: [
      {
        path: '404',
        name: '404',
        component: () => import(/* webpackChunkName: "error-page-404" */ '@/views/error-page/404.vue')
      },
      {
        path: '401',
        name: '401',
        component: () => import(/* webpackChunkName: "error-page-401" */ '@/views/error-page/401.vue')
      },
    ]
  },
  ...constantModules
]

const router = createRouter({
  // scrollBehavior: () => ({ top: 0 }),
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export function setupRouter (app: App): void {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
