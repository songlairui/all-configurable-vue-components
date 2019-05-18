export default {
  props: {
    propsValidator: {
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
          type: type ? type : schema.type
        })
      })
      return items
    }
  }
}
