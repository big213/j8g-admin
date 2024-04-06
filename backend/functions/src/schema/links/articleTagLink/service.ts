import { LinkService } from "../../core/services";
import { AccessControlMap } from "../../../types";

export class ArticleTagLinkService extends LinkService {
  defaultTypename = "articleTagLink";

  filterFieldsMap = {};

  uniqueKeyMap = {
    primary: ["id"],
  };

  sortFieldsMap = {
    createdAt: {},
    updatedAt: {}
  };

  searchFieldsMap = {};

  groupByFieldsMap = {};

  accessControl: AccessControlMap = {};
}
