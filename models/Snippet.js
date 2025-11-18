const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema({
  title: String,
  code: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Snippet", snippetSchema);
