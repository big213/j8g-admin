import type { SimpleRecordInfo } from '~/types'

export const SimpleNavigationItem = <SimpleRecordInfo<'navigationItem'>>{
  typename: 'navigationItem',
  pluralTypename: 'navigationItems',
  name: 'Navigation Item',
  pluralName: 'Navigation Items',
  icon: 'mdi-view-list',
  hasName: false,
  hasAvatar: false,
  hasDescription: false,
}
