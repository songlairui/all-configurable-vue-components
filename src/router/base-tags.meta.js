//  转化为 loader
export default [
  {
    path: '/base-html',
    name: 'base-html',
    redirect: '/base-html/props-static',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    children: [
      {
        path: 'props-static',
        name: 'props-static'
      }
    ]
  }
]
