const express = require("express");
const Router = express.Router();

const SignUpController = require("../../controllers/signup-controller.js");
const LoginController = require("../../controllers/login-controller.js");

Router.post("/signup", SignUpController);
Router.get("/login", LoginController);

module.exports = Router;
