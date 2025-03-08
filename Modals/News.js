const { default: mongoose } = require("mongoose");

const Newschema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },

    Image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Newsmodel = mongoose.model("news", Newschema);
module.exports = Newsmodel;
