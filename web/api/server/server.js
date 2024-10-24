import "dotenv/config";
import "../shared/yup.js";
import express from "express";
import { apiRouter } from "../routes/api.js";
import { router } from "../routes/router.js";
import { apiRedirect } from "./apiRedirect.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(apiRedirect);
server.use("/api/v1", apiRouter);
server.use(router);

server.use("/pages",express.static(path.resolve("./public/pages")));


server.use((req, res, next)=>{
  return res.sendFile(path.resolve("public","pages","404.html"))

})
const options = {
  definition: { 
    openapi: "3.1.0",
    info: {
      title: "Guarda meu lanche Api",
      version: "0.1.0",
      description: "Uma simples documentação da nossa api.",

      contact: {
        name: "elo1lson",
        url: "https://github.com/elo1lson",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./controllers/*/*.js", "./routes/*.js"],
};

const specs = swaggerJsdoc(options);

server.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

export { server };
