const express = require("express");
const { SignupAdmin, LoginAdmin } = require("../Controller/Admin");
const { body } = require("express-validator");
const AdminRouter = express.Router();

AdminRouter.post(
  "/signup",
  body("Name").notEmpty().withMessage("Name is required"),
  body("Email").notEmpty().withMessage("Email is required"),
  body("Password").notEmpty().withMessage("Password is required"),
  SignupAdmin
);

AdminRouter.post(
  "/login",
  body("Email").notEmpty().withMessage("Email is required"),
  body("Password").notEmpty().withMessage("Password is required"),
  LoginAdmin
);

module.exports = AdminRouter;
