const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please provide a first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name."],
    },
    email: {
      type: String,
      required: [true, "Please provide a last name."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    currentCameraGear:{
      type: String,
    },
    profileImage: {
      type: String,
      default: "public/assets/Profile2.png",
    },
    igLink:{
      type: String,
    },
    fbLink:{
      type: String,
    },
    personalLink:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;