import * as Knex from "knex";

export async function up(knex: Knex): Promise<void[]> {
  return Promise.all([
    knex.schema.createTable("user", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("firebase_uid").notNullable().unique();
      table.string("email").notNullable().unique();
      table.string("avatar_url").nullable();
      table.text("description").nullable();
      table.integer("role").notNullable().defaultTo(2);
      table.jsonb("permissions").nullable();
      table.boolean("is_public").notNullable().defaultTo(true);
      table.boolean("allow_email_notifications").notNullable().defaultTo(true);
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("apiKey", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("code").notNullable().unique();
      table.string("user").notNullable();
      table.jsonb("permissions").nullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("file", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.integer("size").notNullable();
      table.string("location").notNullable();
      table.string("content_type").notNullable();
      table.string("parent_key").nullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("article", function (table) {
      table.string("id").notNullable().primary();
      table.string("image_url").nullable();
      table.string("title").nullable();
      table.text("content").nullable();
      table.jsonb("files").notNullable().defaultTo([]);
      table.jsonb("tags").notNullable().defaultTo([]);
      table.string("handle").notNullable().unique();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("tag", function (table) {
      table.string("id").notNullable().primary();
      table.string("name").notNullable();
      table.string("avatar_url").nullable();
      table.text("description").nullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("navigationItem", function (table) {
      table.string("id").notNullable().primary();
      table.string("article").nullable();
      table.string("path").nullable();
      table.string("text").notNullable();
      table.integer("sort_index").nullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
    }),
    knex.schema.createTable("userUserFollowLink", function (table) {
      table.string("id").notNullable().primary();
      table.string("user").notNullable();
      table.string("target").notNullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
      table.unique(["user", "target"]);
    }),
    knex.schema.createTable("articleTagLink", function (table) {
      table.string("id").notNullable().primary();
      table.string("article").notNullable();
      table.string("tag").notNullable();
      table.dateTime("created_at").notNullable().defaultTo(knex.fn.now());
      table.dateTime("updated_at").notNullable().defaultTo(knex.fn.now());
      table.string("created_by").notNullable();
      table.unique(["article", "tag"]);
    }),
  ]);
}

export async function down(knex: Knex): Promise<void[]> {
  return Promise.all([
    knex.schema.dropTable("user"),
    knex.schema.dropTable("apiKey"),
    knex.schema.dropTable("file"),
    knex.schema.dropTable("article"),
    knex.schema.dropTable("tag"),
    knex.schema.dropTable("navigationItem"),
    knex.schema.dropTable("userUserFollowLink"),
    knex.schema.dropTable("articleTagLink"),
  ]);
}
