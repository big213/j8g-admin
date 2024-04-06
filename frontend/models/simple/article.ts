import type { SimpleRecordInfo } from '~/types'

export const SimpleArticle = <SimpleRecordInfo<'article'>>{
  typename: 'article',
  pluralTypename: 'articles',
  name: 'Article',
  pluralName: 'Articles',
  icon: 'mdi-post',
  hasName: false,
  hasAvatar: false,
  hasDescription: false,
  textField: 'title',
  chipOptions: {
    getName: (item) => item.title,
  },
}
