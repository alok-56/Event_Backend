const express = require("express");
const { body } = require("express-validator");
const upload = require("../Middleware/FileUpload");
const IsAdmin = require("../Middleware/IsAdmin");
const { CreateContact, getContacts } = require("../Controller/Contacts");
const ContactsRouter = express.Router();

ContactsRouter.post(
  "/create",
  // body("Name").notEmpty().withMessage("Name is required"),
  // body("Email").notEmpty().withMessage("Email is required"),
  // body("Titile").notEmpty().withMessage("Titile is required"),
  // body("Description").notEmpty().withMessage("Description is required"),
  upload.single("file"),
  CreateContact
);

ContactsRouter.get("/fetchAll", IsAdmin, getContacts);

module.exports = ContactsRouter;
