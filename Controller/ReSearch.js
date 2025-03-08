const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const deleteImageFromCloudinary = require("../Helper/DeleteImage");
const ResearchModel = require("../Modals/Research");

// Create Research Record
const createResearch = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    if (req.file) {
      req.body.Image = req.file.path;
    }

    let research = await ResearchModel.create(req.body);
    return res.status(201).json({
      status: true,
      code: 201,
      message: "Research record created successfully",
      data: research,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Update Research Record
const updateResearch = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Research ID is required", 400));
    }

    let research = await ResearchModel.findById(id);
    if (!research) {
      return next(new AppErr("Research Not Found", 404));
    }

    let updateData = { ...req.body };

    // Handle Image Update
    if (req.file) {
      if (research.Image) {
        await deleteImageFromCloudinary(research.Image);
      }
      updateData.Image = req.file.path;
    }

    let updatedResearch = await ResearchModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Research record updated successfully",
      data: updatedResearch,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get Single Research Record
const getResearch = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Research ID is required", 400));
    }

    let research = await ResearchModel.findById(id);
    if (!research) {
      return next(new AppErr("Research Not Found", 404));
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Research record fetched successfully",
      data: research,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get All Research Records
const getAllResearch = async (req, res, next) => {
  try {
    let researchRecords = await ResearchModel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All research records fetched successfully",
      data: researchRecords,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Delete Research Record
const deleteResearch = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Research ID is required", 400));
    }

    let research = await ResearchModel.findById(id);
    if (!research) {
      return next(new AppErr("Research Not Found", 404));
    }

    // Delete image from Cloudinary if it exists
    if (research.Image) {
      await deleteImageFromCloudinary(research.Image);
    }

    // Delete research record from database
    await ResearchModel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Research record deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createResearch,
  updateResearch,
  getResearch,
  getAllResearch,
  deleteResearch,
};
