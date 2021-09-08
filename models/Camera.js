const mongoose = require("mongoose");


const cameraSchema = new mongoose.Schema(
  {
    cameraName: {
      type: String,
      required: [true, "name can not be empty"],
    },
    brandName:{
      type: String,
    },
    cameraImage: {
      type: String,
      required: [true, "image can not be empty"],
    },
    yearReleased: {
      type: Number,
    },
    interchangeableLens:{
      type: Boolean,
    },
    imageFormat:{
      type: String,
    },
    categories:{
      type: [String]
    },
    photographyType:{
      type:String,
    },
  },
  {
    timestamps: true, 
  }
);

const Camera = mongoose.model("Camera", cameraSchema);

module.exports = Camera;
