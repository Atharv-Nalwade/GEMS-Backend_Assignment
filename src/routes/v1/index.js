const express = require("express");
const Router = express.Router();

const SignUpController = require("../../controllers/signup-controller.js");
const LoginController = require("../../controllers/login-controller.js");
const InvitationController = require("../../controllers/invitation-controller.js");
const LogoutController = require("../../controllers/logout-controller.js");
const EditUserController = require("../../controllers/editUser-controller.js");

const authenticate = require("../../middleware/authenticate.js");

Router.post("/signup", SignUpController);
Router.get("/login", LoginController);

Router.post('/invitation',authenticate, InvitationController);
Router.get('/logout',authenticate,LogoutController);

Router.put('/editUser',authenticate,EditUserController);

module.exports = Router;

