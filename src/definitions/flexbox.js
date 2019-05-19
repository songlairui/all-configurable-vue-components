export default {
  _type: 'FlexBox',
  type: 'array',
  items: {
    _type: 'FlexBoxObj',
    type: 'object',
    properties: {
      direction: {
        type: 'string',
        enum: ['row', 'column']
      },
      flex: {
        type: 'integer',
        example: 1
      },
      // slot: {
      //   type: 'boolean'
      // },
      child: {
        $ref: '#/definitions/flexbox'
      }
    }
  }
}
