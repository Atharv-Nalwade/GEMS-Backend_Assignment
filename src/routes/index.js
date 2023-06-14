const express = require("express");
const v1Routes = require("./v1");

const Router = express.Router();

Router.use("/v1", v1Routes);

module.exports = Router;
