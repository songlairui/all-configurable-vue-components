export default {
  functional: true,
  render(h, context) {
    return h('div', context.data, context.children)
  }
}
