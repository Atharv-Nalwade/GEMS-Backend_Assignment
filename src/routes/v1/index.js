const express = require("express");
const Router = express.Router();

const SignUpController = require("../../controllers/signup-controller");
const LoginController = require("../../controllers/login-controller");
const InvitationController = require("../../controllers/invitation-controller");
const LogoutController = require("../../controllers/logout-controller");
const EditUserController = require("../../controllers/editUser-controller");

const authenticate = require("../../middleware/authenticate");

Router.post("/signup", SignUpController);
Router.get("/login", LoginController);

Router.post('/invitation', authenticate, InvitationController);
Router.get('/logout', authenticate, LogoutController);

Router.put('/editUser', authenticate, EditUserController);

module.exports = Router;
