const { default: mongoose } = require("mongoose");

const Publicationschema = new mongoose.Schema(
  {
    Title: {
      type: String,
    },
    Description: {
      type: String,
    },
    Date: {
      type: String,
    },
    Publisedby: {
      type: String,
    },
    Image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Publicationmodel = mongoose.model("publication", Publicationschema);
module.exports = Publicationmodel;
