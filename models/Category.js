const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  system: {
    type: String,
    default: "",
  },
  note: {
    type: String,
    default: "",
  },
  user: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("categories", categorySchema);
