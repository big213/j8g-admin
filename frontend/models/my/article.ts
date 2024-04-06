import { Article } from '../base'

export const MyArticle = {
  ...Article,
  routeType: 'my',
  title: `My ${Article.pluralName}`,
  paginationOptions: {
    ...Article.paginationOptions,
    downloadOptions: undefined,
  },
  enterOptions: {},
}
