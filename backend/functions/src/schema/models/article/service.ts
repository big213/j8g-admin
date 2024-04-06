import { lookupSymbol } from "giraffeql";
import {
  AccessControlMap,
  ExternalQuery,
  ServiceFunctionInputs,
} from "../../../types";
import { PaginatedService } from "../../core/services";
import { permissionsCheck } from "../../core/helpers/permissions";
import {
  createObjectType,
  updateObjectType,
} from "../../core/helpers/resolver";
import { knex } from "../../../utils/knex";
import { ArticleTagLink } from "../../services";
import { KeyMap } from "../../core/services/paginated";

export class ArticleService extends PaginatedService {
  defaultTypename = "article";

  defaultQuery: ExternalQuery = {
    id: lookupSymbol,
    name: lookupSymbol,
    avatarUrl: lookupSymbol,
    description: lookupSymbol,
  };

  filterFieldsMap = {
    id: {},
    "createdBy.id": {},
    "articleTagLink/tag.id": {},
  };

  uniqueKeyMap: KeyMap = {
    primary: ["id"],
    handle: ["handle"]
  };

  sortFieldsMap = {
    id: {},
    createdAt: {},
    updatedAt: {},
  };

  searchFieldsMap = {
    title: {},
  };

  accessControl: AccessControlMap = {};

  @permissionsCheck("create")
  async createRecord({
    req,
    fieldPath,
    args,
    query,
    data = {},
    isAdmin = false,
  }: ServiceFunctionInputs) {
    await this.handleLookupArgs(args);

    let addResults;
    await knex.transaction(async (transaction) => {
      addResults = await createObjectType({
        typename: this.typename,
        addFields: {
          // only add the id field if the id field is a string (not auto-increment)
          ...(!this.primaryKeyAutoIncrement && {
            id: await this.generateRecordId(transaction),
          }),
          ...args,
          createdBy: req.user!.id,
        },
        req,
        fieldPath,
        transaction,
      });

      // also need to sync the articleTagLink
      for (const tag of args.tags) {
        await ArticleTagLink.createSqlRecord({
          fields: {
            article: addResults.id,
            tag: tag.id,
            createdBy: req.user!.id,
          },
          transaction,
        });
      }
    });

    // do post-create fn, if any
    await this.afterCreateProcess(
      {
        req,
        fieldPath,
        args,
        query,
        data,
        isAdmin,
      },
      addResults.id
    );

    return this.isEmptyQuery(query)
      ? {}
      : await this.getRecord({
          req,
          args: { id: addResults.id },
          query,
          fieldPath,
          isAdmin,
          data,
        });
  }

  @permissionsCheck("update")
  async updateRecord({
    req,
    fieldPath,
    args,
    query,
    data = {},
    isAdmin = false,
  }: ServiceFunctionInputs) {
    const item = await this.getFirstSqlRecord(
      {
        select: ["id"],
        where: args.item,
      },
      true
    );

    // convert any lookup/joined fields into IDs
    await this.handleLookupArgs(args.fields);

    await knex.transaction(async (transaction) => {
      await updateObjectType({
        typename: this.typename,
        id: item.id,
        updateFields: {
          ...args.fields,
          updatedAt: 1,
        },
        req,
        fieldPath,
        transaction,
      });

      // also need to sync the articleTagLink entries if tags is provided
      if (args.fields.tags)
        await ArticleTagLink.deleteSqlRecord({
          where: {
            article: item.id,
          },
          transaction,
        });

      for (const tag of args.fields.tags) {
        await ArticleTagLink.createSqlRecord({
          fields: {
            article: item.id,
            tag: tag.id,
            createdBy: req.user!.id,
          },
          transaction,
        });
      }
    });

    // do post-update fn, if any
    await this.afterUpdateProcess(
      {
        req,
        fieldPath,
        args,
        query,
        data,
        isAdmin,
      },
      item.id
    );

    return this.isEmptyQuery(query)
      ? {}
      : await this.getRecord({
          req,
          args: { id: item.id },
          query,
          fieldPath,
          isAdmin,
          data,
        });
  }

  getOnDeleteEntries(): {
    service: PaginatedService;
    field?: string;
  }[] {
    return [
      {
        service: ArticleTagLink,
        field: "article",
      },
    ];
  }
}
