const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const deleteImageFromCloudinary = require("../Helper/DeleteImage");
const Eventmodel = require("../Modals/Events");

const createEvent = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    if (!req.file) {
      return next(new AppErr("Image is required", 400));
    }

    let { Title, Description, type } = req.body;
    req.body.Image = req.file.path;

    let event = await Eventmodel.create(req.body);
    return res.status(200).json({
      status: true,
      code: 200,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const updateEvent = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Event ID is required", 400));
    }

    let event = await Eventmodel.findById(id);
    if (!event) {
      return next(new AppErr("Event Not Found", 404));
    }

    let updateData = {};

    // Check for body fields and update only provided values
    const { Title, Description, type } = req.body;
    if (Title) updateData.Title = Title;
    if (Description) updateData.Description = Description;
    if (type) updateData.type = type;

    // Handle Image Update
    if (req.file) {
      if (event.Image) {
        await deleteImageFromCloudinary(event.Image);
      }
      updateData.Image = req.file.path;
    }

    let updatedEvent = await Eventmodel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const getEvent = async (req, res, next) => {
  
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Event ID is required", 400));
    }

    let event = await Eventmodel.findById(id);
    if (!event) {
      return next(new AppErr("Event Not Found", 404));
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Event fetched successfully",
      data: event,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const getAllEvents = async (req, res, next) => {
  try {
    let events = await Eventmodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All events fetched successfully",
      data: events,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const deleteEvent = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Event ID is required", 400));
    }

    let event = await Eventmodel.findById(id);
    if (!event) {
      return next(new AppErr("Event Not Found", 404));
    }

    // Delete image from Cloudinary if it exists
    if (event.Image) {
      await deleteImageFromCloudinary(event.Image);
    }

    // Delete event from database
    await Eventmodel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getEvent,
  getAllEvents,
  deleteEvent,
};
