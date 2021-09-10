const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: true,
    },
    currentCameraGear: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "/assets/Profile2.png",
    },
    igLink: {
      type: String,
    },
    fbLink: {
      type: String,
    },
    personalLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;