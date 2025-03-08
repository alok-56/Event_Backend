const AppErr = require("./AppError");
const cloudinary = require("cloudinary").v2;

const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;
    const publicId = imageUrl.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    return nextTick(new AppErr(error.message, 500));
  }
};

module.exports = deleteImageFromCloudinary;
