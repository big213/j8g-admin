import { GiraffeqlScalarType } from "giraffeql";

function validate(value: unknown) {
  if (typeof value !== "string") throw true;

  if (!value.match(/^[0-9a-z-]+$/)) throw true;

  return value;
}

export const handle = new GiraffeqlScalarType({
  name: "handle",
  types: ["string"],
  description: "Handle Field",
  parseValue: validate,
  serialize: validate,
});
