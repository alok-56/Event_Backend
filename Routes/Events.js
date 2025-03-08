const express = require("express");
const { body, validationResult } = require("express-validator");
const upload = require("../Middleware/FileUpload");
const {
  createEvent,
  updateEvent,
  getEvent,
  getAllEvents,
  deleteEvent,
} = require("../Controller/Event");
const IsAdmin = require("../Middleware/IsAdmin");

const EventRouter = express.Router();

EventRouter.post("/create", IsAdmin, upload.single("file"), createEvent);

EventRouter.patch(
  "/update/:id",
  IsAdmin,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, errors: errors.array() });
    }
    next();
  },
  upload.single("file"),
  updateEvent
);

EventRouter.get("/:id", getEvent);

EventRouter.get("/", getAllEvents);

EventRouter.delete("/:id", IsAdmin, deleteEvent);

module.exports = EventRouter;
