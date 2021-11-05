const { Schema, model } = require("mongoose");

const ChuckNorrisJokesSchema = new Schema({
  id: Schema.Types.ObjectId,
  joke: String,
  categories: [String],
  created_at: Date,
});

module.exports = model("ChuckNorrisJokes", ChuckNorrisJokesSchema);
