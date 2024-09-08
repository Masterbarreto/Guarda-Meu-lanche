import { tableNames } from '../knex/tableNames.js'

export const up = function(knex) {
    return knex.schema.createTable(tableNames.restaurants, t => {
        t.bigIncrements('id').primary().notNullable()
        t.string('name', 250).notNullable()
    })
};

export const down = function(knex) {
    return knex.schema.dropTable(tableNames.restaurants)
};
