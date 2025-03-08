const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");

const deleteImageFromCloudinary = require("../Helper/DeleteImage");
const Newsmodel = require("../Modals/News");


const createNews = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    if (!req.file) {
      return next(new AppErr("Image is required", 400));
    }

    let { Title, Description } = req.body;
    req.body.Image = req.file.path;

    let news = await Newsmodel.create(req.body);
    return res.status(200).json({
      status: true,
      code: 200,
      message: "News created successfully",
      data: news,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};


const updateNews = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("News ID is required", 400));
    }

    let news = await Newsmodel.findById(id);
    if (!news) {
      return next(new AppErr("News Not Found", 404));
    }

    let updateData = {};

    // Check for body fields and update only provided values
    const { Title, Description } = req.body;
    if (Title) updateData.Title = Title;
    if (Description) updateData.Description = Description;

    // Handle Image Update
    if (req.file) {
      if (news.Image) {
        await deleteImageFromCloudinary(news.Image);
      }
      updateData.Image = req.file.path;
    }

    let updatedNews = await Newsmodel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "News updated successfully",
      data: updatedNews,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};


const getNews = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("News ID is required", 400));
    }

    let news = await Newsmodel.findById(id);
    if (!news) {
      return next(new AppErr("News Not Found", 404));
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "News fetched successfully",
      data: news,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const getAllNews = async (req, res, next) => {
  try {
    let news = await Newsmodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All news fetched successfully",
      data: news,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};


const deleteNews = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("News ID is required", 400));
    }

    let news = await Newsmodel.findById(id);
    if (!news) {
      return next(new AppErr("News Not Found", 404));
    }

    // Delete image from Cloudinary if it exists
    if (news.Image) {
      await deleteImageFromCloudinary(news.Image);
    }

    // Delete news from database
    await Newsmodel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "News deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createNews,
  updateNews,
  getNews,
  getAllNews,
  deleteNews,
};
