const express = require("express");
const { body, validationResult } = require("express-validator");
const upload = require("../Middleware/FileUpload");

const IsAdmin = require("../Middleware/IsAdmin");
const {
  createResearch,
  updateResearch,
  getResearch,
  getAllResearch,
  deleteResearch,
} = require("../Controller/ReSearch");

const ResearchRouter = express.Router();

ResearchRouter.post("/create", IsAdmin, upload.single("file"), createResearch);

ResearchRouter.patch(
  "/update/:id",
  IsAdmin,
  upload.single("file"),
  updateResearch
);

ResearchRouter.get("/:id", getResearch);

ResearchRouter.get("/", getAllResearch);

ResearchRouter.delete("/:id", IsAdmin, deleteResearch);

module.exports = ResearchRouter;
