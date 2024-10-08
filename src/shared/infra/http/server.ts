import { dbContext } from "../typeorm";
import app from "./config/app";

const port = process.env.PORT || "3333";

dbContext
  .initialize()
  .then(() => {
    app.listen(port, () => {
      console.log("Data Source has been initialized!");
      console.log("running server " + port);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
