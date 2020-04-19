const mongoose = require("mongoose");
var Schema = mongoose.Schema

let tokenSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId }
});

module.exports = mongoose.model("Token", tokenSchema);