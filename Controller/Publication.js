const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const deleteImageFromCloudinary = require("../Helper/DeleteImage");
const Publicationmodel = require("../Modals/Publication");

const createPublication = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    if (req.file) {
      req.body.Image = req.file.path;
    }

    let Publication = await Publicationmodel.create(req.body);
    return res.status(200).json({
      status: true,
      code: 200,
      message: "Publication created successfully",
      data: Publication,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const updatePublication = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Publication ID is required", 400));
    }

    let Publication = await Publicationmodel.findById(id);
    if (!Publication) {
      return next(new AppErr("Publication Not Found", 404));
    }

    let updateData = {};

    const { Title, Description, type, Date,Publisedby } = req.body;
    if (Title) updateData.Title = Title;
    if (Description) updateData.Description = Description;
    if (type) updateData.type = type;
    if (Date) updateData.Date = Date;
    if (Publisedby) updateData.Publisedby = Publisedby;

    // Handle Image Update
    if (req.file) {
      if (Publication.Image) {
        await deleteImageFromCloudinary(Publication.Image);
      }
      updateData.Image = req.file.path;
    }

    let updatedPublication = await Publicationmodel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Publication updated successfully",
      data: updatedPublication,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const getPublication = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Publication ID is required", 400));
    }

    let Publication = await Publicationmodel.findById(id);
    if (!Publication) {
      return next(new AppErr("Publication Not Found", 404));
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Publication fetched successfully",
      data: Publication,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const getAllPublications = async (req, res, next) => {
  try {
    let Publications = await Publicationmodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All Publications fetched successfully",
      data: Publications,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const deletePublication = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Publication ID is required", 400));
    }

    let Publication = await Publicationmodel.findById(id);
    if (!Publication) {
      return next(new AppErr("Publication Not Found", 404));
    }

    // Delete image from Cloudinary if it exists
    if (Publication.Image) {
      await deleteImageFromCloudinary(Publication.Image);
    }

    // Delete Publication from database
    await Publicationmodel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Publication deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createPublication,
  updatePublication,
  getPublication,
  getAllPublications,
  deletePublication,
};
