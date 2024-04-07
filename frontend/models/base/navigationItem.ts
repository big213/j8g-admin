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
      fieldOptions: {
        inputOptions: {
          textField: 'title',
        },
      },
    }),
    path: {
      text: 'Path',
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
        field: 'sortIndex',
        width: '100px',
        align: 'right',
      },
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
    fields: ['sortIndex', 'text', 'article', 'path'],
  },
  editOptions: {
    fields: ['sortIndex', 'text', 'article', 'path'],
  },
  viewOptions: {
    fields: ['sortIndex', 'text', 'articleRecord', 'path'],
    heroOptions: {},
  },
  enterOptions: {},
  deleteOptions: {},
  shareOptions: {},
  expandTypes: [],
}
