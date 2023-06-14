const express = require("express");
const bodyParser = require("body-parser");
const v1Routes = require("./routes/index.js");

const SetupAndStartServer = () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", v1Routes);

  app.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
};

SetupAndStartServer();
