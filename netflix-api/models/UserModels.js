const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  likedMedia: [
    {
      mediaId: { type: Number, required: true },
      mediaType: { type: String },
      addedAt: { type: Date, default: Date.now },
    },
  ],
  wantToWatch: [
    {
      mediaId: { type: Number, required: true },
      mediaType: { type: String, required: true },
      markedBy: { type: String, required: true }, // Username of the user who marked it
      addedAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("users", usersSchema);
