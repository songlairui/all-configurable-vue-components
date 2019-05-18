import { FlexBox } from '@/definitions/types'

export default {
  props: {
    layout: FlexBox
  },
  render() {
    return (
      <div class="add-slot">
        {this.children &&
          this.children.map((item) => (
            <div>{Object.entries(item)[0].join(' - ')}</div>
          ))}
      </div>
    )
  }
}
