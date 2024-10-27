import { tableNames } from "../knex/tableNames.js";

export const up = function (knex) {
  return knex.schema.createTable(tableNames.users, (t) => {
    t.bigIncrements("id").primary().notNullable();
    t.string("email", 70).unique().notNullable();
    t.string("passwordHash").notNullable();
    t.date("age").notNullable();
    t.string("cpf", 11).notNullable();
    t.string("name", 250).notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.string("validation_code").nullable();
    t.boolean("is_verified").defaultTo(false);
    t.enu('role', ['Aluno', 'Funcionário', 'Administrador']).notNullable();
  })
};

export const down = function (knex) {
  return knex.schema.dropTable(tableNames.users);
};
