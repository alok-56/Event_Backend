const { default: mongoose } = require("mongoose");

const Homeschema = new mongoose.Schema(
  {
    SliderImage: {
      type: [],
    },
    Mission: {
      type: [],
    },
    Vission: {
      type: [],
    },
    Objective: {
      type: [],
    },
    Outcomes: {
      type: [],
    },
    scopeImage: {
      type: String,
    },
    applicationImage: {
      type: String,
    },
    modalImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Homemodel = mongoose.model("home", Homeschema);
module.exports = Homemodel;
