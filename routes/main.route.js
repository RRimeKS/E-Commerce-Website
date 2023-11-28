const router = require('express').Router();
const ApiError = require("../utils/ApiError");
//models
const Category = require("../models/category.model");
//controller
const mainController = require("../controllers/main.controller");

router.get("/", mainController.homepage);
router.get("/kategori/:slug", mainController.get_selectedCategoryProduct);
router.get("/urun/:name", mainController.get_specifcProduct);

module.exports = router;