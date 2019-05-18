export default {
  props: {
    value: [String, Boolean, Number],
    type: {
      type: String,
      default: 'text',
      validator(val) {
        return ['text', 'password', 'number'].indexOf(val) > -1
      }
    }
  },
  computed: {
    emitValue: {
      get() {
        return this.value
      },
      set(val) {
        if (this.type === 'number') {
          val = parseFloat(val)
        }
        this.$emit('input', val)
      }
    }
  }
}
