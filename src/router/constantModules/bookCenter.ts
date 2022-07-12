import { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout/index.vue'
import { BookRouteNameEnum } from "@/router/index.model";

const bookRouter: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: BookRouteNameEnum.首页,
        component: () => import(/* webpackChunkName: "book" */ '@/views/bookCenter/index.vue'),
      },
      {
        path: '/bookEdit',
        name: BookRouteNameEnum.书籍编辑,
        component: () => import(/* webpackChunkName: "newBook" */ '@/views/bookCenter/bookEdit/bookEdit.vue'),
      },
      {
        path: '/bookSource',
        name: BookRouteNameEnum.书籍,
        component: () => import(/* webpackChunkName: "editBook" */ '@/views/bookCenter/bookSource/bookSource.vue'),
      },
      {
        path: '/characterCenter',
        name: BookRouteNameEnum.角色,
        component: () => import(/* webpackChunkName: "editBook" */ '@/views/characterCenter/index.vue'),
      },
      {
        path: '/editor',
        name: BookRouteNameEnum.编辑器,
        component: () => import(/* webpackChunkName: "editBook" */ '@/views/editor/index.vue'),
      }
    ]
  }
]

export default bookRouter;
