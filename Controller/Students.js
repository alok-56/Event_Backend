const { validationResult } = require("express-validator");
const AppErr = require("../Helper/AppError");
const deleteImageFromCloudinary = require("../Helper/DeleteImage");
const Studentsmodel = require("../Modals/Students");

// Create Student
const createStudent = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    if (req.file) {
      req.body.Image = req.file.path;
    }

    let student = await Studentsmodel.create(req.body);
    return res.status(200).json({
      status: true,
      code: 200,
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Update Student
const updateStudent = async (req, res, next) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      return next(new AppErr(err.errors[0].msg, 403));
    }

    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Student ID is required", 400));
    }

    let student = await Studentsmodel.findById(id);
    if (!student) {
      return next(new AppErr("Student Not Found", 404));
    }

    let updateData = {};
    const {
      Name,
      LastDate,
      About,
      Research,
      Role,
      Email,
      Education,
      Experience,
      Links,
      Awards,
      exam,
    } = req.body;

    if (Name) updateData.Name = Name;
    if (LastDate) updateData.LastDate = LastDate;
    if (About) updateData.About = About;
    if (Research) updateData.Research = Research;
    if (Role) updateData.Role = Role;
    if (Email) updateData.Email = Email;
    if (Education) updateData.Education = Education;
    if (Experience) updateData.Experience = Experience;
    if (Links) updateData.Links = Links;
    if (Awards) updateData.Awards = Awards;
    if (exam) updateData.exam = exam;

    // Handle Image Update
    if (req.file) {
      if (student.Image) {
        await deleteImageFromCloudinary(student.Image);
      }
      updateData.Image = req.file.path;
    }

    let updatedStudent = await Studentsmodel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Student updated successfully",
      data: updatedStudent,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get Single Student
const getStudent = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Student ID is required", 400));
    }

    let student = await Studentsmodel.findById(id);
    if (!student) {
      return next(new AppErr("Student Not Found", 404));
    }

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Student fetched successfully",
      data: student,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Get All Students
const getAllStudents = async (req, res, next) => {
  try {
    let students = await Studentsmodel.find();

    return res.status(200).json({
      status: true,
      code: 200,
      message: "All students fetched successfully",
      data: students,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

// Delete Student
const deleteStudent = async (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(new AppErr("Student ID is required", 400));
    }

    let student = await Studentsmodel.findById(id);
    if (!student) {
      return next(new AppErr("Student Not Found", 404));
    }

    // Delete image from Cloudinary if it exists
    if (student.Image) {
      await deleteImageFromCloudinary(student.Image);
    }

    // Delete student from database
    await Studentsmodel.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      code: 200,
      message: "Student deleted successfully",
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createStudent,
  updateStudent,
  getStudent,
  getAllStudents,
  deleteStudent,
};
