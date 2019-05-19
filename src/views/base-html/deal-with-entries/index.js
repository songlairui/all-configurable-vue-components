import _ from 'lodash'
import { FlexboxArray } from '@/definitions/types'
import LayoutWrapper from '@/components/layout-wrapper'

const calcSlotMap = (
  flexboxMeta = {},
  parentId = [],
  rendered = [],
  options = {}
) => {
  const result = {}
  const { childKey = 'child' } = options
  const { [childKey]: children, _id, slot } = flexboxMeta
  const currentPath = [...parentId, _id]
  rendered.push(_id)
  if (rendered.includes(slot)) {
    console.error(`Slot [${_id}] refs to [${slot}] was circled ~. Skipped`)
  } else if (slot) {
    result[_id] = { slot, currentPath }
  }
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((item) => {
        const { result: subMap } = calcSlotMap(item, currentPath, rendered)
        Object.assign(result, subMap)
      })
    }
  }

  return { result, rendered }
}

const calcSlotStopCircle = (
  { entry = '', pool = [] },
  rendered = [],
  options = {}
) => {
  const start = pool.find(({ _id }) => entry === _id)
  if (!start) {
    return { result: {}, rendered }
  }
  // console.group('~')
  const { result } = calcSlotMap(start, [], rendered, options)
  Object.values(result).forEach(({ slot: subKey }) => {
    const { result: subResult } = calcSlotStopCircle(
      { entry: subKey, pool },
      rendered,
      options
    )
    Object.assign(result, subResult)
  })
  // console.groupEnd()

  return { result, rendered }
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
