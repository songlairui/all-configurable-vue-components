export default [
  {
    path: '/base-html',
    name: 'base-html',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      nav: () => import('../views/base-html/nav'),
      default: () => import('../views/base-html'),
      dashboard: () => import('../views/base-html/d')
    },
    children: [
      {
        path: 'div',
        components: {
          default: () => import('../views/base-html/div'),
          dashboard: () => import('../views/base-html/div/d')
        }
      }
    ]
  }
]
