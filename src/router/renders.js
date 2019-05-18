export default [
  {
    path: '/renders',
    name: 'renders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    components: {
      nav: () => import('../views/renders/nav'),
      default: () => import('../views/renders'),
      dashboard: () => import('../views/renders/d')
    }
  }
]
