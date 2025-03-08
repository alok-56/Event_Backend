const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const Contactsmodel = require("../Modals/Contacts");

// Create Contacts
const CreateContact = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (err.errors.length > 0) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    // if (!req.file) {
    //   return next(new AppErr("File not found", 400));
    // }

    let { Name, Email, Number, Title, Description } = req.body;
    if(req.file){
      req.body.Image = req.file.path;
    }
    

    let contact = await Contactsmodel.create(req.body);
    return res.status(200).json({
      status: true,
      code: 200,
      message: "Successfully Created",
      data: contact,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get All Contacts
const getContacts = async (req, res, next) => {
  try {
    let contacts = await Contactsmodel.find();
    return res.status(200).json({
      status: true,
      code: 200,
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  CreateContact,
  getContacts,
};
