import VString from './string'
import VArray from './array'
import { getType } from './_utils'

export default {
  functional: true,
  name: 'ValModel',
  props: {
    type: null,
    schema: null
  },
  render(h, context) {
    const { data, children, props } = context
    const { type } = props

    const expectedType = getType(type)

    let vNode = VString
    switch (expectedType) {
      case 'Array':
        vNode = VArray

        break
      default:
    }

    return h(vNode, data, children)
  }
}
