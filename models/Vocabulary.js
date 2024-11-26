const mongoose = require("mongoose");

const VocabularySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  word: { type: String, required: true },
  meaning: { type: String, required: true },
  example: { type: String },
  level: { type: Number },
});

module.exports = mongoose.model("Vocabulary", VocabularySchema);
