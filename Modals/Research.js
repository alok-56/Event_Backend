const { default: mongoose } = require("mongoose");

const Researchschema = new mongoose.Schema(
  {
    Name: {
      type: String
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
    Interest: {
      type: [],
    },
    Awards: {
      type: [],
    },
    Links: {
      type: [],
    },
    Image: {
      type: String
    },
  },
  { timestamps: true }
);

const ResearchModel = mongoose.model("Reaserch", Researchschema);
module.exports = ResearchModel;
