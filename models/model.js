const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
  Name: String,
  scores: Number,
  slug: {
    type: String,
    lowercase: true,
  },
});
const PlayerModel = mongoose.model("Player", playerSchema);
module.exports = PlayerModel;