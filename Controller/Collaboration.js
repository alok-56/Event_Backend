const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const Collaborationmodel = require("../Modals/Collaboration");
const deleteImageFromCloudinary = require("../Helper/DeleteImage");

// Create Collaboration
const createCollaboration = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    if (!req.file) {
      return next(new AppErr("File not found", 400));
    }

    let { Name, Title, Expertise, Role } = req.body;
    req.body.Image = req.file.path;

    let collaboration = await Collaborationmodel.create(req.body);
    return res.status(200).json({
      status: true,
      code: 200,
      message: "Successfully Created",
      data: collaboration,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Update Collaboration
const UpdateCollaboration = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Collaboration ID is required", 400));
    }

    let data = await Collaborationmodel.findById(id);
    if (!data) {
      return next(new AppErr("Collaboration Not Found", 400));
    }

    let updateData = {};

    // Check for body fields and add them to updateData
    const { Name, Title, Expertise, Role } = req.body;
    if (Name) updateData.Name = Name;
    if (Title) updateData.Title = Title;
    if (Expertise) updateData.Expertise = Expertise;
    if (Role) updateData.Role = Role;

    // Handle Image Update
    if (req.file) {
      if (data.Image) {
        await deleteImageFromCloudinary(data.Image);
      }
      updateData.Image = req.file.path;
    }

    let collaboration = await Collaborationmodel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Successfully Updated",
      data: collaboration,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get By Id Collaboration
const GetCollaboration = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Collaboration ID is required", 400));
    }

    let collaboration = await Collaborationmodel.findById(id);
    if (!collaboration) {
      return next(new AppErr("Collaboration Not Found", 404));
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Collaboration fetched successfully",
      data: collaboration,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get All Collaboration
const GetAllCollaborations = async (req, res, next) => {
  try {
    let collaborations = await Collaborationmodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All collaborations fetched successfully",
      data: collaborations,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Delete Collaboration
const DeleteCollaboration = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Collaboration ID is required", 400));
    }

    let collaboration = await Collaborationmodel.findById(id);
    if (!collaboration) {
      return next(new AppErr("Collaboration Not Found", 404));
    }

    // Delete image from Cloudinary if it exists
    if (collaboration.Image) {
      await deleteImageFromCloudinary(collaboration.Image);
    }

    // Delete collaboration from database
    await Collaborationmodel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Collaboration deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createCollaboration,
  UpdateCollaboration,
  GetAllCollaborations,
  GetCollaboration,
  DeleteCollaboration,
};
