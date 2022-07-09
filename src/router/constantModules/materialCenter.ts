import { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout/index.vue'
import { BookRouteNameEnum } from "@/router/index.model";

const materialCenter: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/materialCenter',
        name: BookRouteNameEnum.素材中心,
        component: () => import(/* webpackChunkName: "newBook" */ '@/views/materialCenter/index.vue'),
      },
    ]
  }
]

export default materialCenter;
