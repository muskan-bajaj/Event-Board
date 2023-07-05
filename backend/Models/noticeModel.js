const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticeSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    eventDes: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NOTICE", noticeSchema);
