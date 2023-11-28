// express
const express = require("express");
const router = express.Router();
//controller
const categoryController = require("../controllers/category.controller");
//validator
const categoryValidator = require("../utils/validators/category.validator");
//middlewares
const imageUpload = require("../middlewares/uploadImage.middleware");
const isAdmin = require("../middlewares/isAdmin");
const isModerator = require("../middlewares/isAdmin");

//get all category
router.get("/categories", categoryController.get_categories);
//get specific category
router.get("/category/:id", categoryValidator.getOneValidator, categoryController.get_category);
//create category
router.get("/create/category", isModerator, categoryController.get_createCategory);
router.post("/create/category", categoryValidator.createCategoryValidator, categoryController.post_createCategory);

//delete category
router.get("/delete/category/:id", isAdmin, categoryController.get_deleteCategory);
router.post("/delete/category/:id", categoryController.post_deleteCategory);

//update category
router.get("/edit/category/:id", isModerator, categoryController.get_updateCategory);
router.post("/edit/category/:id", categoryValidator.updateCategoryValidator, categoryController.post_updateCategory);

module.exports = router;
