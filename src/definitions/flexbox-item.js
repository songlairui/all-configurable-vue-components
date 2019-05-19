export default {
  _type: 'FlexboxItem',
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
    slot: {
      type: 'string',
      summary: '插槽 ID'
    },
    child: {
      $ref: '#/definitions/flexbox-array'
    }
  }
}
