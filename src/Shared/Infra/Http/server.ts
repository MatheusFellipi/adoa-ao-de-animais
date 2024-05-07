import "reflect-metadata";
require("dotenv").config({ path: __dirname + "/.env" });

import app from "./config/app";

import { dbConnection } from "../typeorm";

const port = process.env.PORT || "3333";

dbConnection.initialize().then(() => {
  app.listen(port, () => {
    console.log("Data Source has been initialized!")
    console.log("running server " + port);
  });
}).catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

