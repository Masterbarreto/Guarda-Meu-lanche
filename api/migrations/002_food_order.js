import { tableNames } from '../knex/tableNames.js'

export const up = function(knex) {
    return knex.schema.createTable(tableNames.food_order, t => {
        t.bigIncrements('id').primary();
        t.bigInteger('user_id').unsigned().notNullable();
        t.foreign('user_id').references('id').inTable(tableNames.users);
        t.bigInteger('restaurant_id').unsigned().notNullable();
        t.foreign('restaurant_id').references('id').inTable(tableNames.restaurants);
    })
};

export const down = function(knex) {
    return knex.schema.dropTable(tableNames.food_order)
};
