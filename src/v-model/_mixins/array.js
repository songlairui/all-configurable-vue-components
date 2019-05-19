import { getExample } from '@/definitions'

import ValModel from '../index'

export default {
  components: { ValModel },
  props: {
    schema: {
      default: () => ({})
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      drag: false
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },
    myArray: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    getId(item) {
      if (!item) {
        return '-'
      }
      switch (typeof item) {
        case 'object':
          return item._id || Object.values(item)[0]
        default:
          return `${item}`
      }
    },
    addOneItem() {
      const exampleItem = getExample(this.schema.items)
      this.$emit('input', [...this.value, exampleItem])
    },
    emit(val, idx) {
      const newVal = [...this.value]
      newVal.splice(idx, 1, val)
      this.$emit('input', newVal)
    },
    del(idx) {
      const newVal = [...this.value]
      newVal.splice(idx, 1)
      this.$emit('input', newVal)
    }
  }
}
