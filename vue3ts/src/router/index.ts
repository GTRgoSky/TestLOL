import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import apiRoute from './apiRoute';
import Home from '../views/Home.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'App',
    component: Home,
    children: [
      // {
      //   path: '/',
      //   name: 'Home',
      //   component: () => import('@/views/Home.vue')
      // },
      {
        path: 'about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'communication',
        name: 'communication',
        component: () => import('../views/talk/parent.vue')
      },
    ]
  },
  ...apiRoute(Home),
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
