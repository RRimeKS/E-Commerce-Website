//custom modules
const factory = require("../controllers/factoryHandler");
const ApiError = require("../utils/ApiError");
//models
const Category = require("../models/category.model");

//get all category
exports.get_categories = async (req, res, next) => {
  const categories = await Category.find();
  const categoryCount = await Category.count();

  try {
    res.render("category/list-categories", {
      title: "Kategoriler",
      categories: categories,
      categoryCount: categoryCount,
    });
  } catch (error) {
    return next(new ApiError(error, 400));
  }
};

//get specific category
exports.get_category = factory.get_one(Category);

//create category
exports.get_createCategory = (req, res) => {
  res.render("category/category-create", {
    title: "Kategori-oluştur",
  });
};
exports.post_createCategory = factory.create_one(Category, "/categories");
//update category
exports.get_updateCategory = async (req, res, next) => {
  const category = await Category.findOne({ _id: req.params.id });
  try {
    res.render("category/category-edit", {
      title: category.name + " adlı kategori güncelleniyor",
      categories: category,
    });
  } catch (error) {
    return next(new ApiError(error, 400));
  }
};
exports.post_updateCategory = async (req, res, next) => {
  const id = req.body.id;
  try {
    const category = await Category.findByIdAndDelete(id);

    req.session.alert = {
      message: "Kategori silme işlemi tamalandı.",
      type: "success",
    };
    return res.redirect("/categories");

  } catch (error) {
    return next(new ApiError(error, 400));
  }
};

//delete category
exports.get_deleteCategory = async (req, res, next) => {
  const category = await Category.findOne({ _id: req.params.id });
  try {
    res.render("category/category-delete", {
      title: category.name + " adlı kategori siliniyor",
      category: category,
    });
  } catch (error) {
    return next(new ApiError(error, 400));
  }
};
exports.post_deleteCategory = factory.deleteOne(Category);
