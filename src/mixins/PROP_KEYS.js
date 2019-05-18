export default {
  props: {
    propsValidator: {
      schema: Object,
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    PROP_ITEMS() {
      const items = []
      Object.entries(this.propsValidator).forEach(([propKey, option = {}]) => {
        if (propKey.startsWith('_')) {
          return
        }
        let { type, schema = {} } = option
        items.push({
          propKey,
          type,
          schema
        })
      })
      return items
    }
  }
}
