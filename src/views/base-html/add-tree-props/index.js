import _ from 'lodash'
import { FlexboxArray } from '@/definitions/types'
import { calcSlotMap } from '@/utils'

import LayoutWrapper from '@/components/layout-wrapper'

export default {
  props: {
    value: null,
    child: Array,
    layout: FlexboxArray
  },
  render() {
    const slotMaps = _.cloneDeep(calcSlotMap(this.layout).result)
    const scopedSlots = {}
    Object.keys(slotMaps).forEach((key) => {
      scopedSlots[key] = (scopedata) => <div>{scopedata.data}</div>
    })
    return (
      <div class="add-slot">
        <div class="value">value: {this.value}</div>
        <div class="child">child: {this.child && this.child.join()}</div>

        <LayoutWrapper layout={this.layout} scopedSlots={scopedSlots}>
          <div>default slot</div>
        </LayoutWrapper>
      </div>
    )
  }
}
