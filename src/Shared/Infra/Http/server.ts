import app from "./config/app";
import { dbContext } from "../typeorm";


const port = process.env.PORT || "3333";

dbContext.initialize().then(() => {
  app.listen(port, () => {
    console.log("Data Source has been initialized!")
    console.log("running server " + port);
  });
}).catch((err) => {
  console.error("Error during Data Source initialization:", err)
})

