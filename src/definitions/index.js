import _ from 'lodash'
import shortid from 'shortid'
import FlexboxArray from './flexbox-array'
import FlexboxItem from './flexbox-item'

const pool = {
  FlexboxArray,
  FlexboxItem
}

export const getSchemaByref = function({ $ref }) {
  const target = _.upperFirst(_.camelCase($ref.replace('#/definitions/', '')))
  // console.info('target', target, $ref)
  return pool[target]
}

const isRef = ({ $ref } = {}) => {
  return $ref && typeof $ref === 'string' && $ref.startsWith('#/')
}

const getObjectExample = function({ properties = {} }) {
  const data = {}
  Object.entries(properties).forEach(([key, schema]) => {
    if (isRef(schema)) {
      return
    }
    data[key] = getExample(schema)
  })
  data._id = shortid.generate()
  return data
}

export const getExample = function(schema = {}) {
  if (!schema) {
    return shortid.generate()
  }
  if (isRef(schema)) {
    return getExample(getSchemaByref(schema))
  }
  const { example, default: dVal, enum: enums = [] } = schema
  if (example || dVal || enums.length) {
    return example || dVal || enums[0]
  }
  switch (schema.type) {
    case 'string':
      return 'string'
    case 'integer':
    case 'number':
      return Math.round(Math.random() * 10000)
    case 'boolean':
      return false
    case 'object':
      return getObjectExample(schema)
    case 'array':
      return getExample(schema.items)
    default:
  }
}

export default pool
