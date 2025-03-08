const { default: mongoose } = require("mongoose");

const Contactsschema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Number: {
      type: String,
    },
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
    },
  },
  { timestamps: true }
);

const Contactsmodel = mongoose.model("Contacts", Contactsschema);
module.exports = Contactsmodel;
