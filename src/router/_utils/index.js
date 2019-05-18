import _ from 'lodash'

const genComponents = (names, options = [['nav']]) => {
  if (!Array.isArray(names)) {
    names = [names]
  }
  return {
    default: () => import(`../../views/${names.join('/')}`),
    ...options.reduce((result, [key, file]) => {
      result[key] = () =>
        import(`../../views/${names.join('/')}/${file || key}`)
      return result
    }, {})
  }
}

export const fulfillChildrenMeta = function(routeChildren, parentName) {
  let result = {}
  if (_.isEmpty(routeChildren)) {
    return result
  }
  if (!Array.isArray(routeChildren)) {
    if (typeof routeChildren === 'object') {
      routeChildren = Object.entries(routeChildren).map(([name, meta]) => ({
        ...meta,
        name
      }))
    } else {
      console.warn('route meta not valid', routeChildren)
      return result
    }
  }
  if (!routeChildren.length) {
    return result
  }
  return {
    children: routeChildren.map((item) => {
      let name = item
      let path
      if (typeof name === 'string') {
        name = item
        path = item
      } else {
        name = item.name || item.path
        path = item.path || name
      }
      return {
        name,
        path,
        ...fulfillChildrenMeta(item.children, name),
        components: genComponents([parentName, name], [['dashboard', 'd']])
      }
    })
  }
}
export const fulfillMeta = function(routeMeta) {
  return Object.entries(routeMeta).map(([name, meta]) => {
    const path = meta.path || `/${name}`
    const children = fulfillChildrenMeta(meta.children, name)

    return {
      path,
      name,
      ...children,
      components: genComponents(name, [['nav']])
    }
  })
}
