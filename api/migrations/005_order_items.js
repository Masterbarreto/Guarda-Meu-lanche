import { tableNames } from "../knex/tableNames.js";

export const up = function (knex) {
  return knex.schema.createTable(tableNames.order_items, (t) => {
    t.bigIncrements("id").primary(); // Identificador único para o item do pedido
    t.bigInteger("order_id").unsigned().notNullable(); // Referência ao pedido
    t.foreign("order_id")
      .references("id")
      .inTable(tableNames.food_order)
      .onDelete("CASCADE"); // Chave estrangeira para a tabela food_order

    t.bigInteger("menu_item_id").unsigned().notNullable(); // Referência ao item do menu
    t.foreign("menu_item_id")
      .references("id")
      .inTable(tableNames.menu_item)
      .onDelete("RESTRICT"); // Chave estrangeira para a tabela menu_item

    t.integer("quantity").notNullable(); // Quantidade do item no pedido

    // Índices para melhorar a performance de consultas
    t.index(["order_id", "menu_item_id"]);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable(tableNames.order_items);
};
