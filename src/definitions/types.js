import DEFINITIONS from '@/definitions'

export const FlexboxArray = {
  toString: () => `function FlexboxArray`,
  schema: DEFINITIONS.FlexboxArray,
  default: () => []
}

export const FlexboxItem = {
  toString: () => `function FlexboxItem`,
  schema: DEFINITIONS.FlexboxItem,
  default: () => ({})
}
