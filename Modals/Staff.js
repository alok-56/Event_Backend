const { default: mongoose } = require("mongoose");

const Staffschema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    LastDate: {
      type: String,
    },
    Title: {
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
    Experience: {
      type: [],
    },
    Skills: {
      type: [],
    },
    Interest: {
      type: [],
    },
    Awards: {
      type: [],
    },
    Links: {
      type: [],
    },
    Patents: {
      type: [],
    },
    Image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Staffmodel = mongoose.model("AdminstrativeStaff", Staffschema);
module.exports = Staffmodel;
