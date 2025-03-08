const express = require("express");
const { body } = require("express-validator");
const upload = require("../Middleware/FileUpload");
const {
  createNews,
  updateNews,
  getNews,
  getAllNews,
  deleteNews,
} = require("../Controller/News");
const IsAdmin = require("../Middleware/IsAdmin");

const NewsRouter = express.Router();

const validateNews = [
  body("Title").notEmpty().withMessage("Title is required"),
  body("Description").notEmpty().withMessage("Description is required"),
];

NewsRouter.post(
  "/create",
  IsAdmin,
  validateNews,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
  },
  upload.single("file"),
  createNews
);

NewsRouter.patch(
  "/update/:id",
  IsAdmin,
  validateNews,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
  },
  upload.single("file"),
  updateNews
);

NewsRouter.get("/:id", getNews);

NewsRouter.get("/", getAllNews);

NewsRouter.delete("/:id", IsAdmin, deleteNews);

module.exports = NewsRouter;
