import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import rendersRoutes from './renders'
import baseHtmlRoutes from './base-tags'

Vue.use(Router)

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
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      components: {
        default: () => import('../views/About/index.vue'),
        dashboard: () => import('../views/About/d.vue')
      }
    },
    ...rendersRoutes,
    ...baseHtmlRoutes
  ]
})
