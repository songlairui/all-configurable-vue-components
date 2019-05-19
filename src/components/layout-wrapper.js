export default {
  functional: true,
  name: 'LayoutWrapper',
  props: {
    layout: null,
    scopedata: null
  },
  render(h, context) {
    const { layout, scopedata } = context.props
    // console.info('context', context)

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
        >
          {context.scopedSlots[meta._id]
            ? context.scopedSlots[meta._id](scopedata)
            : `${meta.slot ? `slot:${meta.slot}` : `_id:${meta._id}`}`}
        </div>
      )
    }

    return (
      <div class="layout-wrapper d-f">{layout && layout.map(renderFlex)}</div>
    )
  }
}
