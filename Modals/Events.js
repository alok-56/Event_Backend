const { default: mongoose } = require("mongoose");

const Eventschema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    eventdate: {
      type: String,
      required: true,
    },
    eventlocation: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Upcoming", "Past"],
    },
    Image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Eventmodel = mongoose.model("event", Eventschema);
module.exports = Eventmodel;
