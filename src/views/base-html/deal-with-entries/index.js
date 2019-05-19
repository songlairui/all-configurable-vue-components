import _ from 'lodash'
import { calcSlotStopCircle } from '@/utils'
import { FlexboxArray } from '@/definitions/types'
import LayoutWrapper from '@/components/layout-wrapper'

export default {
  name: 'DealWithEntries',
  props: {
    entry: {
      type: String
    },
    children: FlexboxArray
  },
  render() {
    const entryLayout = this.children.find((item) => item._id === this.entry)
    const slotMapOri = calcSlotStopCircle({
      entry: this.entry,
      pool: this.children
    }).result
    // console.info(slotMapOri, 'slotMap')
    const slotMap = _.cloneDeep(slotMapOri || {})
    Object.keys(slotMap).forEach((slotKey) => {
      const targetSlotKey = slotMap[slotKey].slot
      const targetLayout = this.children.find(
        (item) => item._id === targetSlotKey
      )
      slotMap[slotKey] = (scopeProps) => (
        <LayoutWrapper layout={[targetLayout]}>
          <div>
            targetSlotKey: {{ targetSlotKey }} ~ {{ scopeProps }}
          </div>
        </LayoutWrapper>
      )
    })
    return (
      <div class="deal-with-entries overauto">
        <div class="value">entry: {this.entry}</div>
        <div class="child">
          children _ids:{' '}
          {this.children && this.children.map((i) => i._id).join()}
        </div>
        {entryLayout ? (
          <LayoutWrapper layout={[entryLayout]} scopedSlots={slotMap} />
        ) : (
          <h2>No Entry</h2>
        )}
      </div>
    )
  }
}
