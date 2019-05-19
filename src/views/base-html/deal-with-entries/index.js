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

    return (
      <div class="deal-with-entries overauto">
        <div class="value">entry: {this.entry}</div>
        <div class="child">
          children _ids:{' '}
          {this.children && this.children.map((i) => i._id).join()}
        </div>
        {entryLayout ? (
          <LayoutWrapper
            layout={[entryLayout]}
            layoutPool={this.children}
            scopedSlots={{
              aa1TeF83K: (subProp) => <div> subProp: {subProp.msg} </div>
            }}
          >
            <div>default slot</div>
          </LayoutWrapper>
        ) : (
          <h2>No Entry</h2>
        )}
      </div>
    )
  }
}
