import type { SimpleRecordInfo } from '~/types'

export const SimpleTag = <SimpleRecordInfo<'tag'>>{
  typename: 'tag',
  pluralTypename: 'tags',
  name: 'Tag',
  pluralName: 'Tags',
  icon: 'mdi-tag',
  hasName: true,
  hasAvatar: true,
  hasDescription: true,
}
