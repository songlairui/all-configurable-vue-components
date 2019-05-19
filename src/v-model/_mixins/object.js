import _ from 'lodash'
import { getExample, getSchemaByref } from '@/definitions'
import ValModel from '../index'

export default {
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
    fullfilSchema() {
      const { properties } = this.schema
      const fullfil = {}
      Object.entries(properties).forEach(([key, value]) => {
        fullfil[key] = value.$ref ? getSchemaByref(value) : value
      })
      return { ...this.schema, properties: fullfil }
    },
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
    }
  }
}
