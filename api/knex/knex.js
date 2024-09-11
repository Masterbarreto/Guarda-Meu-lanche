import knex from "knex";
import config from "./knexfile.js";
import path from 'path'
import "dotenv/config";
const getEnviroment = config[process.env.DATABASE_ENV] || config.development;
console.log(getEnviroment)
const Knex = knex(getEnviroment);

export { Knex };
