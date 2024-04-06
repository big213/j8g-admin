import { User, Tag } from "../../services";
import { GiraffeqlObjectType, ObjectTypeDefinition } from "giraffeql";
import {
  generateIdField,
  generateTimestampFields,
  generateCreatedByField,
  generateStringField,
  generateTextField,
  generateTypenameField,
  processTypeDef
} from "../../core/helpers/typeDef";
import * as Scalars from "../../scalars";

export default new GiraffeqlObjectType(<ObjectTypeDefinition>processTypeDef({
  name: Tag.typename,
  description: "Tag type",
  fields: {
    ...generateIdField(Tag),
    ...generateTypenameField(Tag),
    name: generateStringField({ allowNull: false }),
    avatarUrl: generateStringField({ allowNull: true, type: Scalars.imageUrl }),
    description: generateTextField({
      allowNull: true,
    }),
    ...generateTimestampFields(),
    ...generateCreatedByField(User),
  },
}));
