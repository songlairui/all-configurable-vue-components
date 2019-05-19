import { FlexboxArray } from '@/definitions/types'
import LayoutWrapper from '@/components/layout-wrapper'

const calcSlotMap = (flexboxMeta = {}, childKey = 'child') => {
  const result = {}
  const { [childKey]: children, _id, slot } = flexboxMeta
  if (slot) {
    result[_id] = slot
  }
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((item) => {
        const subMap = calcSlotMap(item)
        Object.assign(result, subMap)
      })
    }
  }

  return result
}

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
    const slotMap = calcSlotMap(entryLayout)
    Object.keys(slotMap).forEach((slotKey) => {
      const targetSlotKey = slotMap[slotKey]
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
          <LayoutWrapper layout={[entryLayout]} scopedSlots={slotMap}>
            <div>default slot</div>
          </LayoutWrapper>
        ) : (
          <h2>No Entry</h2>
        )}
      </div>
    )
  }
}
