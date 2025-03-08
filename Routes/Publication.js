const express = require("express");
const { body, validationResult } = require("express-validator");
const upload = require("../Middleware/FileUpload");
const IsAdmin = require("../Middleware/IsAdmin");
const {
  createPublication,
  updatePublication,
  getPublication,
  getAllPublications,
  deletePublication,
} = require("../Controller/Publication");

const PublicationRouter = express.Router();

PublicationRouter.post("/create", IsAdmin, upload.single("file"), createPublication);

PublicationRouter.patch(
  "/update/:id",
  IsAdmin,
  upload.single("file"),
  updatePublication
);

PublicationRouter.get("/:id", getPublication);

PublicationRouter.get("/", getAllPublications);

PublicationRouter.delete("/:id", IsAdmin, deletePublication);

module.exports = PublicationRouter;
