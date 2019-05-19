import _ from 'lodash'
import { calcSlotMap, collectLeafSlot } from '@/utils'
import { FlexboxItem } from '@/definitions/types'
import LayoutWrapper from '@/components/layout-wrapper'

export default {
  name: 'CombineSomething',
  props: {
    layout: FlexboxItem
  },
  render() {
    const scopedata = {
      params: {
        sort_type: 'latest',
        status: 'executing',
        leave_time: '1month'
      }
    }
    // 数据填充

    const leafSlots = _.cloneDeep(collectLeafSlot(this.layout))
    const scopedSlots = {}

    leafSlots.forEach((key) => {
      scopedSlots[key] = (scope) => <div>~|{scope.data}|~</div>
    })

    const { layout } = this
    return (
      <div>
        <div>~~</div>
        {layout ? (
          <LayoutWrapper
            scopedSlots={scopedSlots}
            layout={[layout]}
            scopedata={scopedata}
          />
        ) : (
          <h2>No Entry</h2>
        )}
      </div>
    )
  }
}
