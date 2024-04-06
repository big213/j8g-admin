import { User, Article, File, Tag } from "../../services";
import { GiraffeqlObjectType, ObjectTypeDefinition } from "giraffeql";
import {
  generateIdField,
  generateTimestampFields,
  generateCreatedByField,
  generateStringField,
  generateTextField,
  generateTypenameField,
  processTypeDef,
  generateDataloadableField,
} from "../../core/helpers/typeDef";
import * as Scalars from "../../scalars";

export default new GiraffeqlObjectType(
  <ObjectTypeDefinition>processTypeDef({
    name: Article.typename,
    description: "Article type",
    fields: {
      ...generateIdField(Article),
      ...generateTypenameField(Article),
      imageUrl: generateStringField({
        allowNull: true,
        type: Scalars.imageUrl,
      }),
      title: generateStringField({
        allowNull: true,
      }),
      content: generateTextField({
        allowNull: true,
      }),
      files: generateDataloadableField({
        service: File,
        isArray: true,
        allowNull: false,
      }),
      tags: generateDataloadableField({
        service: Tag,
        isArray: true,
        allowNull: false,
      }),
      ...generateTimestampFields(),
      ...generateCreatedByField(User),
    },
  })
);
