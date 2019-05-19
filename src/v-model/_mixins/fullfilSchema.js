import { getSchemaByref } from '@/definitions'

export default {
  computed: {
    fullfilSchema() {
      const { items, properties } = this.schema
      const fullfil = {}
      if (items && items.$ref) {
        const fullItems = getSchemaByref(items)

        return { ...this.schema, items: fullItems }
      }
      Object.entries(properties).forEach(([key, value]) => {
        fullfil[key] = value.$ref ? getSchemaByref(value) : value
      })
      return { ...this.schema, properties: fullfil }
    }
  }
}
