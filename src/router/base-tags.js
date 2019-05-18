export default [
  {
    path: '/base-html',
    name: 'base-html',
    redirect: '/base-html/props-static',
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
        path: 'props-static',
        name: 'props-static',
        components: {
          default: () => import('../views/base-html/props-static'),
          dashboard: () => import('../views/base-html/props-static/d')
        }
      },
      {
        path: 'props-dynamic-base',
        name: 'props-dynamic-base',
        components: {
          default: () => import('../views/base-html/props-dynamic-base'),
          dashboard: () => import('../views/base-html/props-dynamic-base/d')
        }
      },
      {
        path: 'props-dynamic-with-prop-keys',
        name: 'props-dynamic-with-prop-keys',
        components: {
          default: () =>
            import('../views/base-html/props-dynamic-with-prop-keys'),
          dashboard: () =>
            import('../views/base-html/props-dynamic-with-prop-keys/d')
        }
      }
    ]
  }
]
