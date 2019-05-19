import { FlexBox } from '@/definitions/types'

export default {
  props: {
    value: null,
    child: Array,
    layout: FlexBox
  },
  render() {
    return (
      <div class="add-slot">
        {this.value}
        {this.child && this.child.map((c) => <div>{c}</div>)}
        {JSON.stringify(this.layout, null, 1)}
      </div>
    )
  }
}
