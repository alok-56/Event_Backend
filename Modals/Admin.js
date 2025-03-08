const { default: mongoose } = require("mongoose");

const Adminschema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Adminmodel = mongoose.model("Admin", Adminschema);
module.exports = Adminmodel;
