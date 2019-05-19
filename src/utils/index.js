export const calcSlotMap = (
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

export const calcSlotStopCircle = (
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
