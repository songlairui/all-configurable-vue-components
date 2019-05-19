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
    // slot: {
    //   type: 'boolean'
    // },
    child: {
      $ref: '#/definitions/flexbox-array'
    }
  }
}
