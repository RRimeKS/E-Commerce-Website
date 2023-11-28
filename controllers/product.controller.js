//models
const Product = require("../models/product.model");
const Category = require("../models/category.model");
//modules
const fs = require("fs");
const slugify = require("slugify");
//middlewares
const isAdmin = require("../middlewares/isAdmin");
const isModerator = require("../middlewares/isAdmin");
const isAuth = require("../middlewares/isAuth");
const ApiFeatures = require("../utils/ApiFeatures");
const ApiError = require("../utils/ApiError");

exports.get_products = async (req, res, next) => {
  let apiFeatures;
  const countDocument = await Product.countDocuments;
  const productCount = await Product.count();
  if (req.session.role.includes("Admin")) {
    apiFeatures = new ApiFeatures(Product.find(), req.query).filter().pagination(countDocument).search().sort();
  } else {
    apiFeatures = new ApiFeatures(Product.find({ user: req.session.userId }), req.query).filter().pagination(countDocument).search().sort();
  }
  try {
    const { mongooseQuery } = apiFeatures
    const product = await mongooseQuery;
    res.render("product/product-list", {
      title: "Ürünler", products: product, productCount: productCount,
      page: Math.ceil(productCount / (5)), path: req._parsedOriginalUrl.pathname, currentPage: req.query.page
    });
  } catch (error) {
    return next(new ApiError(error, 400));
  }
};

//create
exports.get_createProduct = async (req, res, next) => {
  try {
    const category = await Category.find();
    const productCount = await Product.count();
    res.render("product/product-create", {
      title: "Ürünler",
      categories: category,
      productCount: productCount,
      userId: req.session.userId
    });
  } catch (error) {
    return next(error, 400);
  }
};
exports.post_createProduct = async (req, res, next) => {
  let { title, description, quantity, price, imageCover, images, category, color, userId } = req.body;

  if (req.file) imageCover = req.file.filename;
  try {
    if (imageCover == undefined) {
      return res.render("partials/errors", {
        title: "Hata",
        errors: [{ msg: "Kapak resmi eklenmelidir." }]
      });
    }
    const product = await Product.create({
      title, description, quantity, price, imageCover, images, category, color, user: userId, slug: slugify(title),
    });
    return res.redirect("/products?page=1&limit=1");
  } catch (error) {
    return next(error, 400);
  }
};

//edit
exports.get_editProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    const category = await Category.find();
    const selectedCategory = await Category.find({ _id: product.category._id });
    res.render("product/product-edit", {
      title: "Ürünler",
      categories: category,
      product: product,
      selectedCategory: selectedCategory,
    });
  } catch (error) {
    return next(error, 400);
  }
};
exports.post_editProduct = async (req, res, next) => {
  const getProduct = await Product.findById(req.body.id);
  let { title, description, quantity, price, imageCover, images, category, color } = req.body;
  try {
    if (req.file) { imageCover = req.file.filename; } else { imageCover = getProduct.imageCover; }
    if (category == "null") category = await getProduct.category.toString();
    const product = await Product.findByIdAndUpdate(req.body.id, { title, description, quantity, price, imageCover, images, category, color, slug: slugify(title) }, { new: true });
    return res.redirect("/products?page=1&limit=1");

  } catch (error) {
    return next(error, 400);
  }
};


//delete
exports.get_deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    res.render("product/product-delete", {
      title: product.title + " adlı ürün siliniyor",
      product: product,
    });

    return res.redirect("/products");
  } catch (error) {
    return next(error, 400);
  }
};
exports.post_deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.body.id);
    return res.redirect("/products");
  } catch (error) {
    return next(error, 400);
  }
};