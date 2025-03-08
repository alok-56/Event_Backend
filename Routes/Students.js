const express = require("express");
const { body, validationResult } = require("express-validator");
const upload = require("../Middleware/FileUpload");
const {
  createStudent,
  updateStudent,
  getStudent,
  getAllStudents,
  deleteStudent,
} = require("../Controller/Students");
const IsAdmin = require("../Middleware/IsAdmin");

const StudentsRouter = express.Router();

StudentsRouter.post("/create", IsAdmin, upload.single("file"), createStudent);

StudentsRouter.patch(
  "/update/:id",
  IsAdmin,

  upload.single("file"),
  updateStudent
);

StudentsRouter.get("/:id", getStudent);

StudentsRouter.get("/", getAllStudents);

StudentsRouter.delete("/:id", IsAdmin, deleteStudent);

module.exports = StudentsRouter;
