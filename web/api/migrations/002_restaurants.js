import { tableNames } from "../knex/tableNames.js";

export const up = function (knex) {
  return knex.schema.createTable(tableNames.restaurants, (t) => {
    t.bigIncrements("id").primary().notNullable();
    t.string("name", 250).notNullable();
    t.bigInteger("area_id");
    t.foreign("area_id").references("id").inTable(tableNames.food_area).onDelete("CASCADE");
    t.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

export const down = function (knex) {
  return knex.schema.dropTable(tableNames.restaurants);
};
