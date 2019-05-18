import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import rendersRoutes from './renders'
import baseTags from './base-tags'
import { fulfillMeta } from './_utils'

Vue.use(Router)

const baseRoute = fulfillMeta(baseTags)
console.info('baseRoute', baseRoute)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      components: {
        default: () => import('../views/About/index.vue'),
        dashboard: () => import('../views/About/d.vue')
      }
    },
    ...baseRoute,
    ...rendersRoutes
  ]
})
