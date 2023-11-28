const mongoose = require("mongoose");

const categorySchmea = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Category name is required"],
    unique: [true, "Category name must be unique"],
    min: [3, "Too short category name"],
  },
  slug: {
    type: String,
    lowercase: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Category", categorySchmea);
