import _ from 'lodash'
import { getExample } from '@/definitions'
import ValModel from '../index'

import FullfilSchema from './fullfilSchema'

export default {
  mixins: [FullfilSchema],
  components: { ValModel },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    schema: {
      default: () => ({})
    }
  },
  data() {
    return {
      KEYS: Object.keys(this.schema.properties).slice(0, 1),
      emitValue: _.cloneDeep(getExample(this.schema))
    }
  },
  computed: {
    ALL_KEYS() {
      return Object.keys(this.schema.properties)
    },
    addAble() {
      return this.ALL_KEYS.length > this.KEYS.length
    },
    KEYS_TO_ADD() {
      return this.ALL_KEYS.filter((key) => !this.KEYS.includes(key))
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (!val) {
          return
        }
        this.KEYS = this.ALL_KEYS.filter((key) => val[key] !== undefined)
      }
    }
  },
  methods: {
    selectKey(val) {
      if (val) {
        this.KEYS.push(val)
      }
    },
    emit(val, KEY) {
      const { ...newVal } = this.value
      newVal[KEY] = val
      this.$emit('input', newVal)
    },
    del(KEY) {
      const { ...newVal } = this.value
      delete newVal[KEY]
      this.$emit('input', newVal)
    }
  }
}
