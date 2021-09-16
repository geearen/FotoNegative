const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
{
  category:{
    type:String
  },
  index:{
    type: Number
  }
}
)

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;