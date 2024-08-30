import "dotenv/config";
import express from "express"
import { router } from "../routes/router.js"
import { apiRedirect } from "./apiRedirect.js"
const server = express();

server.use(express.json());
server.use(apiRedirect);
server.use('/api/v1', router);

export { server };