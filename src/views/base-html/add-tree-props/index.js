import { FlexboxArray } from '@/definitions/types'

import LayoutWrapper from '@/components/layout-wrapper'

export default {
  props: {
    value: null,
    child: Array,
    layout: FlexboxArray
  },
  render() {
    return (
      <div class="add-slot">
        <div class="value">value: {this.value}</div>
        <div class="child">child: {this.child && this.child.join()}</div>

        <LayoutWrapper
          layout={this.layout}
          scopedSlots={{
            aa1TeF83K: (subProp) => <div> subProp: {subProp.msg} </div>
          }}
        >
          <div>default slot</div>
        </LayoutWrapper>
      </div>
    )
  }
}
