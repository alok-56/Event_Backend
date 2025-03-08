const express = require("express");
const { body, validationResult } = require("express-validator");
const upload = require("../Middleware/FileUpload");
const {
  createStaff,
  updateStaff,
  getStaff,
  getAllStaff,
  deleteStaff,
} = require("../Controller/Staff");
const IsAdmin = require("../Middleware/IsAdmin");

const StaffRouter = express.Router();



StaffRouter.post(
  "/create",
  IsAdmin,
  
  upload.single("file"),
  createStaff
);

StaffRouter.patch(
  "/update/:id",
  IsAdmin,
  upload.single("file"),
  updateStaff
);

StaffRouter.get("/getstaff", getAllStaff);

StaffRouter.get("/:id", getStaff);

StaffRouter.delete("/:id", IsAdmin, deleteStaff);

module.exports = StaffRouter;
