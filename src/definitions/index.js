import shortid from 'shortid'
import flexbox from './flexbox'

const pool = {
  flexbox
}
export const getSchemaByref = function({ $ref: ref }) {
  const target = ref.replace('#/definitions/', '')
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
    data[key] = getExample(schema, 0)
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
  const { example } = schema
  if (example) {
    return example
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
