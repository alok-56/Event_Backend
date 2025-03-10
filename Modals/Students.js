const { default: mongoose } = require("mongoose");

const Sudentschema = new mongoose.Schema(
  {
    Name: {
      type: String
    },
    LastDate: {
      type: String,
    },
    About: {
      type: String,
    },
    Research: {
      type: String,
    },
    Role: {
      type: String,
    },
    Email: {
      type: String,
    },
    Education: {
      type: [],
    },
    Awards: {
      type: [],
    },
    exam: {
      type: [],
    },
    Experience: {
      type: [],
    },
    Links: {
      type: [],
    },
    Image: {
      type: String,
    
    },
  },
  { timestamps: true }
);

const Studentsmodel = mongoose.model("Students", Sudentschema);
module.exports = Studentsmodel;
