import { tableNames } from '../knex/tableNames.js'

export const up = function(knex) {
    return knex.schema.createTable(tableNames.tokens, t => {
        t.bigIncrements('id').primary();
        t.bigInteger('user_id').unsigned().notNullable();
        t.foreign('user_id').references('id').inTable(tableNames.users);
        t.string('token').unsigned().notNullable();
        t.timestamp('expires_at').notNullable();
        t.timestamp('createdAt').defaultTo(knex.fn.now());

    })
};

export const down = function(knex) {
    return knex.schema.dropTable(tableNames.tokens)
};
