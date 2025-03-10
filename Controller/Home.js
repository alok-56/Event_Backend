const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const deleteImageFromCloudinary = require("../Helper/DeleteImage");
const Homemodel = require("../Modals/Home");

const createHome = async (req, res, next) => {
  try {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return next(new AppErr("No files uploaded", 400));
    }

    let { Mission, Vission, Objective, Outcomes } = req.body;

    const sliderImages = req.files["sliderImages"]?.map((file) => file.path);
    const scopeImage = req.files["scopeImage"]?.[0]?.path;
    const applicationImage = req.files["applicationImage"]?.[0]?.path;
    const modalImage = req.files["modalImage"]?.[0]?.path;

    // Create a new home document
    const home = await Homemodel.create({
      SliderImage: sliderImages || [],
      scopeImage: scopeImage || "",
      applicationImage: applicationImage || "",
      modalImage: modalImage || "",
      Mission: Mission || "",
      Vission: Vission || "",
      Objective: Objective || "",
      Outcomes: Outcomes || "",
    });

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Home document created successfully",
      data: home,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const updateHome = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if the home document exists
    const home = await Homemodel.findById(id);
    if (!home) {
      return next(new AppErr("Home document not found", 404));
    }

    // Extract file paths from the uploaded files (if any)
    const sliderImages = req.files["sliderImages"]?.map((file) => file.path);
    const scopeImage = req.files["scopeImage"]?.[0]?.path;
    const applicationImage = req.files["applicationImage"]?.[0]?.path;
    const modalImage = req.files["modalImage"]?.[0]?.path;

    // Delete old images from Cloudinary if new images are uploaded
    if (sliderImages && home.SliderImage.length > 0) {
      for (const image of home.SliderImage) {
        await deleteImageFromCloudinary(image);
      }
    }
    if (scopeImage && home.scopeImage) {
      await deleteImageFromCloudinary(home.scopeImage); 
    }
    if (applicationImage && home.applicationImage) {
      await deleteImageFromCloudinary(home.applicationImage); // Delete old application image
    }
    if (modalImage && home.modalImage) {
      await deleteImageFromCloudinary(home.modalImage); // Delete old modal image
    }

    // Update the home document with new data
    if (sliderImages) home.SliderImage = sliderImages;
    if (scopeImage) home.scopeImage = scopeImage;
    if (applicationImage) home.applicationImage = applicationImage;
    if (modalImage) home.modalImage = modalImage;

    // Update other fields if provided
    if (req.body.Mission) home.Mission = req.body.Mission;
    if (req.body.Vission) home.Vission = req.body.Vission;
    if (req.body.Objective) home.Objective = req.body.Objective;
    if (req.body.Outcomes) home.Outcomes = req.body.Outcomes;

    await home.save();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Home document updated successfully",
      data: home,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const getAllHome = async (req, res, next) => {
  try {
    let events = await Homemodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All Home fetched successfully",
      data: events,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createHome,
  updateHome,
  getAllHome
};
