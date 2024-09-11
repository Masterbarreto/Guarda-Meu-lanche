import "dotenv/config";
import '../shared/yup.js'
import express from "express"
import { router } from "../routes/router.js"
import { apiRedirect } from "./apiRedirect.js"
const server = express();
console.log(process.env.DATABASE_ENV)
server.use(express.json());
server.use(express.urlencoded({ extended: true }))
server.use(apiRedirect);
server.use('/api/v1', router);

export { server };