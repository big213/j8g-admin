import type { RecordInfo } from '~/types'
import {
  generateBaseFields,
  generatePreviewableJoinableField,
  generateSortOptions,
} from '~/services/recordInfo'
import { SimpleNavigationItem } from '../simple'

export const NavigationItem = <RecordInfo<'navigationItem'>>{
  ...SimpleNavigationItem,
  routeType: 'a',
  fields: {
    ...generateBaseFields(SimpleNavigationItem),
    ...generatePreviewableJoinableField({
      text: 'Article',
      fieldname: 'article',
      typename: 'article',
    }),
    url: {
      text: 'URL',
    },
    text: {
      text: 'Text',
    },
    sortIndex: {
      text: 'Sort Index',
    },
  },
  paginationOptions: {
    searchOptions: undefined,
    filterOptions: [],
    heroOptions: {},
    sortOptions: [
      ...generateSortOptions('sortIndex'),
      ...generateSortOptions('updatedAt'),
    ],
    headerOptions: [
      {
        field: 'text',
        hideIfGrid: true,
      },
      {
        field: 'updatedAt',
        width: '150px',
      },
    ],
  },
  addOptions: {
    fields: ['sortIndex', 'text', 'article', 'url'],
  },
  editOptions: {
    fields: ['sortIndex', 'text', 'article', 'url'],
  },
  viewOptions: {
    fields: ['sortIndex', 'text', 'articleRecord', 'url'],
    heroOptions: {},
  },
  enterOptions: {},
  deleteOptions: {},
  shareOptions: {},
  expandTypes: [],
}
