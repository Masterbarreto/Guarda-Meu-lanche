import { tableNames } from "../knex/tableNames.js";

export const up = function (knex) {
    return knex.schema.createTable("cart", (t) => {
        t.bigIncrements("id").primary(); // Identificador único para o item do pedido
        t.bigInteger("restaurant_id").unsigned().notNullable(); // Referência ao pedido
        t.foreign("restaurant_id")
            .references("id")
            .inTable(tableNames.restaurants)
            .onDelete("CASCADE");

        t.bigInteger("user_id").unsigned().notNullable(); // Referência ao pedido
        t.foreign("user_id")
            .references("id")
            .inTable(tableNames.users)
            .onDelete("CASCADE");

        t.bigInteger("menu_item_id").unsigned().notNullable(); // Referência ao item do menu
        t.foreign("menu_item_id")
            .references("id")
            .inTable(tableNames.menu_item)
            .onDelete("RESTRICT"); // Chave estrangeira para a tabela menu_item

        t.integer("quantity").notNullable(); // Quantidade do item no pedido

        // Índices para melhorar a performance de consultas
        t.index(["user_id"]);
    });
};

export const down = function (knex) {
    return knex.schema.dropTable(tableNames.order_items);
};
