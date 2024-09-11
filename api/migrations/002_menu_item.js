import { tableNames } from '../knex/tableNames.js'

export const up = function(knex) {
    return knex.schema.createTable(tableNames.menu_item, t => {
        t.bigIncrements('id').primary();
        t.bigInteger('restaurant_id').unsigned().notNullable();
        t.foreign('restaurant_id').references('id').inTable(tableNames.restaurants); // Chave estrangeira para a tabela restaurants
        t.string('name', 100).notNullable();
        t.string('desc', 250).notNullable();
        t.string('url', 2048).notNullable();
        t.decimal('price').unsigned();

    });
};

export const down = function(knex) {
    return knex.schema.dropTable(tableNames.menu_item);
};
