import VString from './string'
import VBoolean from './boolean'
import VEnum from './enum'
import { getType } from './_utils'

const VArray = () => import('./array')
const VArrayFlexbox = () => import('./array-flexbox')
const VObject = () => import('./object')
const VObjectFlexbox = () => import('./object-flexbox')

export default {
  functional: true,
  name: 'ValModel',
  props: {
    type: null,
    schema: null,
    placholder: null
  },
  render(h, context) {
    const { data, children, props } = context
    const { schema = {}, type, ...allProps } = props
    data.props = { ...data.props, type, schema, ...allProps }
    const expectedType = getType(type).toLowerCase()
    let vNode = VString
    let finalType = `${schema._type ||
      schema.type ||
      expectedType}`.toLowerCase()
    if (finalType === 'string' && schema.enum) {
      finalType = 'enum'
      data.props.enums = schema.enum
    }
    switch (finalType) {
      case 'array':
        vNode = VArray
        break
      case 'flexbox':
        vNode = VArrayFlexbox
        break
      case 'flexboxobj':
        vNode = VObjectFlexbox
        break
      case 'object':
        vNode = VObject
        break
      case 'enum':
        vNode = VEnum
        break
      case 'boolean':
        vNode = VBoolean
        break
      default:
    }

    return h(vNode, data, children)
  }
}
