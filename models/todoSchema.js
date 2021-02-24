const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  deadline: { type: Number },
});

module.exports = mongoose.model("Todo", TodoSchema);
