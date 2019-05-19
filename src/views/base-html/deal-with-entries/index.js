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
    const genSlotMap = ({ entry, pool, rendered = [] }) => {
      const slotMapOri = calcSlotStopCircle(
        {
          entry,
          pool
        },
        rendered
      ).result
      // console.info(slotMapOri, 'slotMap')
      let nextPool = pool.filter((item) => item._id !== entry)

      const slotMap = _.cloneDeep(slotMapOri || {})
      Object.keys(slotMap).forEach((slotKey) => {
        const targetSlotKey = slotMap[slotKey].slot
        slotMap[slotKey] = (scopeProps) => {
          return genLayout(
            {
              entry: targetSlotKey,
              pool: [...nextPool],
              rendered: []
            },
            scopeProps
          )
        }
      })
      return slotMap
    }
    const genLayout = ({ entry, pool, rendered = [] }, options) => {
      const layout = pool.find((item) => item._id === entry)
      const slotMap = genSlotMap({ entry, pool, rendered })
      return layout ? (
        <LayoutWrapper
          layout={[layout]}
          scopedSlots={slotMap}
          scopedata={options}
        />
      ) : (
        <h2>No Entry</h2>
      )
    }

    return (
      <div class="deal-with-entries overauto">
        <div class="value">entry: {this.entry}</div>
        <div class="child">
          children _ids:{' '}
          {this.children && this.children.map((i) => i._id).join()}
        </div>
        {genLayout({ entry: this.entry, pool: this.children })}
      </div>
    )
  }
}
