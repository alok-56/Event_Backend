const express = require("express");
const { body } = require("express-validator");
const {
  createCollaboration,
  UpdateCollaboration,
  GetAllCollaborations,
  DeleteCollaboration,
  GetCollaboration,
} = require("../Controller/Collaboration");
const upload = require("../Middleware/FileUpload");
const IsAdmin = require("../Middleware/IsAdmin");
const CollaborationRouter = express.Router();

CollaborationRouter.post(
  "/create",
  IsAdmin,
  // body("Name").notEmpty().withMessage("Name is required"),
  // body("Title").notEmpty().withMessage("Title is required"),
  // body("Expertise").notEmpty().withMessage("Expertise is required"),
  // body("Role").notEmpty().withMessage("Role is required"),
  upload.single("file"),
  createCollaboration
);
CollaborationRouter.patch(
  "/update/:id",
  IsAdmin,
  upload.single("file"),
  UpdateCollaboration
);
CollaborationRouter.get("/fetchAll", GetAllCollaborations);
CollaborationRouter.get("/fetch/:id", GetCollaboration);
CollaborationRouter.delete("/delete/:id", IsAdmin, DeleteCollaboration);

module.exports = CollaborationRouter;
