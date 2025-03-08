const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const deleteImageFromCloudinary = require("../Helper/DeleteImage");
const Staffmodel = require("../Modals/Staff");

// Create Staff
const createStaff = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    if (req.file) {
      req.body.Image = req.file.path;
    }

    let staff = await Staffmodel.create(req.body);
    return res.status(201).json({
      status: true,
      code: 201,
      message: "Staff created successfully",
      data: staff,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Update Staff
const updateStaff = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Staff ID is required", 400));
    }

    let staff = await Staffmodel.findById(id);
    if (!staff) {
      return next(new AppErr("Staff Not Found", 404));
    }

    let updateData = { ...req.body };

    // Handle Image Update
    if (req.file) {
      if (staff.Image) {
        await deleteImageFromCloudinary(staff.Image);
      }
      updateData.Image = req.file.path;
    }

    let updatedStaff = await Staffmodel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Staff updated successfully",
      data: updatedStaff,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get Single Staff Member
const getStaff = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Staff ID is required", 400));
    }

    let staff = await Staffmodel.findById(id);
    if (!staff) {
      return next(new AppErr("Staff Not Found", 404));
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Staff fetched successfully",
      data: staff,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get All Staff Members
const getAllStaff = async (req, res, next) => {
  try {
    let staff = await Staffmodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All staff fetched successfully",
      data: staff,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Delete Staff Member
const deleteStaff = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Staff ID is required", 400));
    }

    let staff = await Staffmodel.findById(id);
    if (!staff) {
      return next(new AppErr("Staff Not Found", 404));
    }

    // Delete image from Cloudinary if it exists
    if (staff.Image) {
      await deleteImageFromCloudinary(staff.Image);
    }

    // Delete staff from database
    await Staffmodel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Staff deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createStaff,
  updateStaff,
  getStaff,
  getAllStaff,
  deleteStaff,
};
