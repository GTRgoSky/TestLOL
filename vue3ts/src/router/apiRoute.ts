import { RouteRecordRaw } from 'vue-router'
import { Component } from 'vue'

const apiRoute = function (Main: Component): Array<RouteRecordRaw> {
    return [
        {
            path: '/api',
            name: 'api',
            component: Main,
            children: [
                {
                    path: 'watch',
                    name: 'watch',
                    component: () => import('../views/api/watch.vue')
                },
                {
                    path: 'computed',
                    name: 'computed',
                    component: () => import('../views/api/computed.vue')
                }
            ]

        }
    ]
}

export default apiRoute