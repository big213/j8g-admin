import { User, NavigationItem, Article } from "../../services";
import { GiraffeqlObjectType, ObjectTypeDefinition } from "giraffeql";
import {
  generateIdField,
  generateTimestampFields,
  generateCreatedByField,
  generateStringField,
  generateTypenameField,
  processTypeDef,
  generateJoinableField,
  generateIntegerField,
} from "../../core/helpers/typeDef";
import * as Scalars from "../../scalars";

export default new GiraffeqlObjectType(
  <ObjectTypeDefinition>processTypeDef({
    name: NavigationItem.typename,
    description: "NavigationItem type",
    fields: {
      ...generateIdField(NavigationItem),
      ...generateTypenameField(NavigationItem),
      article: generateJoinableField({
        allowNull: true,
        service: Article,
      }),
      url: generateStringField({
        allowNull: true,
        type: Scalars.url,
      }),
      text: generateStringField({
        allowNull: false,
      }),
      sortIndex: generateIntegerField({
        allowNull: true,
      }),
      ...generateTimestampFields(),
      ...generateCreatedByField(User),
    },
  })
);
