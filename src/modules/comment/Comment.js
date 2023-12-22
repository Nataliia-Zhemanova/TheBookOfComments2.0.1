const mongoose = require("mongoose");
mongoose.Schema.Types.String.set("trim", true);

const Schema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  createdAt: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    default: 5,
  },

  title: {
    type: String,
    required: false,
    default: "",
  },

  description: {
    type: String,
    required: false,
    default: "",
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Comment", Schema);
