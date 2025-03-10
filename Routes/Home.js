const express = require("express");

const { body } = require("express-validator");
const { createHome, getAllHome, updateHome } = require("../Controller/Home");
const IsAdmin = require("../Middleware/IsAdmin");
const upload = require("../Middleware/FileUpload");
const HomeRouter = express.Router();

HomeRouter.post(
  "/create/home",
  IsAdmin,
  upload.fields([
    { name: "sliderImages", maxCount: 10 },
    { name: "scopeImage", maxCount: 1 },
    { name: "applicationImage", maxCount: 1 },
    { name: "modalImage", maxCount: 1 },
  ]),
  createHome
);

HomeRouter.patch(
  "/update/home/:id",
  IsAdmin,
  upload.fields([
    { name: "sliderImages", maxCount: 10 },
    { name: "scopeImage", maxCount: 1 },
    { name: "applicationImage", maxCount: 1 },
    { name: "modalImage", maxCount: 1 },
  ]),
  updateHome
);

HomeRouter.get("/", getAllHome);

module.exports = HomeRouter;
