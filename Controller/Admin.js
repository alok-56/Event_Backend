const { validationResult } = require("express-validator");
const Adminmodel = require("../Modals/Admin");
const generateToken = require("../Helper/GenerateToken");
const AppErr = require("../Helper/AppError");


// Create Admin
const SignupAdmin = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { Name, Email, Password } = req.body;

    // Email Check
    let email = await Adminmodel.findOne({ Email: Email });
    if (email) {
      return next(new AppErr("Email already exisits", 400));
    }

    let admin = await Adminmodel.create(req.body);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Sucessfully created",
      data: admin,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Login Admin
const LoginAdmin = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }
    let { Email, Password } = req.body;
    let admin = await Adminmodel.findOne({ Email: Email, Password: Password });
    if (!admin) {
      return next(
        new AppErr("User not found! Invailed Email or Password", 400)
      );
    }

    let token = await generateToken(admin._id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Login Success",
      data: admin,
      token: token,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  SignupAdmin,
  LoginAdmin,
};
