import type { RecordInfo } from '~/types'
import { generateBaseFields, generateSortOptions } from '~/services/recordInfo'
import { SimpleTag } from '../simple'

export const Tag = <RecordInfo<'tag'>>{
  ...SimpleTag,
  routeType: 'a',
  fields: {
    ...generateBaseFields(SimpleTag),
  },
  paginationOptions: {
    searchOptions: undefined,
    filterOptions: [],
    heroOptions: {},
    sortOptions: [
      ...generateSortOptions("updatedAt"),
    ],
    headerOptions: [
      {
        field: 'nameWithAvatar',
        hideIfGrid: true,
      },
      {
        field: 'updatedAt',
        width: '150px',
      },
    ],
  },
  addOptions: {
    fields: ['avatarUrl', 'name', 'description'],
  },
  editOptions: {
    fields: ['avatarUrl', 'name', 'description'],
  },
  viewOptions: {
    fields: ['avatarUrl', 'name', 'description'],
    heroOptions: {},
  },
  enterOptions: {},
  deleteOptions: {},
  shareOptions: {},
  expandTypes: [],
}
