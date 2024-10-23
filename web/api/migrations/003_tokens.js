import { tableNames } from "../knex/tableNames.js";

export const up = function (knex) {
  return knex.schema.createTable(tableNames.tokens, (t) => {
    t.bigIncrements("id").primary();
    t.bigInteger("user_id").unsigned();
    t.foreign("user_id").references("id").inTable(tableNames.users).onDelete("CASCADE");
    t.bigInteger("restaurant_id").unsigned();
    t.foreign("restaurant_id")
      .references("id")
      .inTable(tableNames.restaurants)
      .onDelete("CASCADE");
    t.string("token", 500).notNullable();
    t.timestamp("expires_at").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.enu("type", ["user", "restaurant"]);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable(tableNames.tokens);
};
