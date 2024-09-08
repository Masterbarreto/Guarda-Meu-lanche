import { tableNames } from '../knex/tableNames.js'

export const up = function(knex) {
    return knex.schema.createTable(tableNames.users, t => {
        t.bigIncrements('id').primary().notNullable()
        t.string('email', 70).unique().notNullable()
        t.string('passwordHash').notNullable()
        t.date('age').notNullable()
        t.string('cpf', 11).notNullable()
        t.string('name', 250).notNullable()
    })
};

export const down = function(knex) {
    return knex.schema.dropTable(tableNames.users)
};
