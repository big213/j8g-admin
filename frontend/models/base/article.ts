import type { RecordInfo } from '~/types'
import {
  generateBaseFields,
  generateMultipleJoinableField,
  generatePreviewableFilesColumn,
  generateSortOptions,
} from '~/services/recordInfo'
import { SimpleArticle } from '../simple'
import AvatarColumn from '~/components/table/avatarColumn.vue'
import { getTags } from '~/services/dropdown'

export const Article = <RecordInfo<'article'>>{
  ...SimpleArticle,
  routeType: 'a',
  fields: {
    ...generateBaseFields(SimpleArticle),
    imageUrl: {
      text: 'Main Image',
      inputType: 'single-image-url',
      component: AvatarColumn,
      inputOptions: {
        avatarOptions: {
          fallbackIcon: 'mdi-post',
        },
      },
    },
    title: {
      text: 'Title',
    },
    content: {
      text: 'Content',
      inputType: 'textarea',
    },
    ...generatePreviewableFilesColumn({
      fieldname: 'files',
      text: 'Files',
      inputType: 'multiple-file',
      hideDownload: true,
      mediaMode: true,
    }),
    tags: generateMultipleJoinableField({
      fieldname: 'tags',
      text: 'Tags',
      typename: 'tag',
      inputType: 'multiple-select',
      fieldOptions: {
        getOptions: (that) =>
          getTags(that, false, {
            sortBy: [
              {
                field: 'name',
                desc: false,
              },
            ],
          }),
      },
    }),
    'articleTagLink/tag.id': {
      getOptions: (that) =>
        getTags(that, false, {
          sortBy: [
            {
              field: 'name',
              desc: false,
            },
          ],
        }),
      parseValue: (val) => {
        if (!Array.isArray(val)) return []
        return val.map((ele) => ele.id)
      },
    },
  },
  paginationOptions: {
    searchOptions: undefined,
    filterOptions: [
      {
        text: 'Tag',
        field: 'articleTagLink/tag.id',
        operator: 'in',
        inputType: 'multiple-select',
        preset: true,
      },
    ],
    heroOptions: {},
    sortOptions: [
      ...generateSortOptions('updatedAt'),
      ...generateSortOptions('createdAt'),
    ],
    headerOptions: [
      {
        field: 'title',
        hideIfGrid: true,
      },
      {
        field: 'updatedAt',
        width: '150px',
      },
    ],
  },
  addOptions: {
    fields: ['imageUrl', 'title', 'content', 'files', 'tags'],
  },
  editOptions: {
    fields: ['imageUrl', 'title', 'content', 'files', 'tags'],
  },
  viewOptions: {
    fields: ['imageUrl', 'title', 'content', 'files', 'tags'],
    heroOptions: {},
  },
  enterOptions: {},
  deleteOptions: {},
  shareOptions: {},
  expandTypes: [],
}
