import { Article, ArticleTagLink, Tag, User } from "../../services";
import { GiraffeqlObjectType } from "giraffeql";
import { generateLinkTypeDef } from "../../core/generators";

export default new GiraffeqlObjectType(
  generateLinkTypeDef(
    {
      article: {
        service: Article,
        allowNull: false,
      },
      tag: {
        service: Tag,
        allowNull: false,
      },
    },
    ArticleTagLink,
    {}
  )
);
