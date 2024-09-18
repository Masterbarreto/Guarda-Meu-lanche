import knex from "knex";
import config from "./knexfile.js";
import path from 'path'
import "dotenv/config";
const getEnvironment = config[process.env.DATABASE_ENV] || config.development;
const Knex = knex(getEnvironment);

export { Knex };
