const { default: mongoose } = require("mongoose");

const Collaborationschema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Title: {
      type: String,
      required: true,
    },
    Expertise: {
      type: String,
      required: true,
    },
    Role: {
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

const Collaborationmodel = mongoose.model("Collaboration", Collaborationschema);
module.exports = Collaborationmodel;
