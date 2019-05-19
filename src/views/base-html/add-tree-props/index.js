import { FlexBox } from '@/definitions/types'

export default {
  props: {
    value: null,
    child: Array,
    layout: FlexBox
  },
  render() {
    const renderFlex = (meta) => {
      const d = meta.direction === 'column' ? 'd-f-v' : ''
      const classes = ['df-h', 'd-f', d]
      return meta.child ? (
        <div class={classes} style="border: thin solid gray;margin: 1px;">
          {meta.child.map(renderFlex)}
        </div>
      ) : (
        // 根据元数据改为 scopeSlot
        <div
          class={classes.concat('f-c-c')}
          style="border: thin solid gray;margin: 1px;"
        >{`slot: ${meta._id}`}</div>
      )
    }

    return (
      <div class="add-slot">
        <div class="value">value: {this.value}</div>
        <div class="child">child: {this.child && this.child.join()}</div>
        {/* {JSON.stringify(this.layout, null, 1)} */}
        <div class="d-f">{this.layout && this.layout.map(renderFlex)}</div>
      </div>
    )
  }
}
