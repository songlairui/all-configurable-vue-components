export default {
  props: {
    children: {
      schema: {
        items: {
          type: 'string'
        }
      },
      type: Array,
      default: () => []
    }
  },
  render() {
    return (
      <div class="add-slot">
        {this.children.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    )
  }
}
