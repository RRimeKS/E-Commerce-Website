const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title is required"],
    minlength: [3, "Too short product title"],
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
    required: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    minlength: [3, "Too short product description"],
    trim: true,
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required"],
  },
  sold: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
  },
  priceAfterDiscount: {
    type: Number,
  },
  color: [String],
  imageCover: {
    type: String,
    required: [true, "Product image cover is required"],
  },
  images: [String],
  price: {
    type: String,
    required: [true, "Product price is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
  ratingsAverage: {
    type: Number,
    min: [1, "En az 1 puan verebilirsiniz"],
    max: [5, "En fazla 5 puan verebilirsiniz"],
  },
  ratingQuantity: {
    type: Number,
    default: 0,
  }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

productSchema.virtual("reviews", {
  ref: "Reviews",
  foreignField: "product",
  localField: "_id"
});

module.exports = mongoose.model("Product", productSchema);
