//express
const express = require("express");
const router = express.Router();
// controller
const productController = require("../controllers/product.controller");
// middlewares - validators
const productValidator = require("../utils/validators/product.validator");
const isAdmin = require("../middlewares/isAdmin");
const isModerator = require("../middlewares/isModerator");
const isAuth = require("../middlewares/isAuth");
const imageUpload = require("../middlewares/uploadImage.middleware");

//read
router.get("/products", isAuth, productController.get_products);
//create
router.get("/create/product", isModerator, productController.get_createProduct);
router.post("/create/product", isModerator, imageUpload.single("imageCover"), productValidator.createProductValidator, productController.post_createProduct);
//delete
router.get("/delete/product/:id", isModerator, productController.get_deleteProduct);
router.post("/delete/product/:id", isModerator, productController.post_deleteProduct);
//update
router.get("/edit/product/:id", isModerator, productController.get_editProduct);
router.post("/edit/product/:id", isModerator, imageUpload.single("imageCover"), productValidator.updateCategoryValidator, productController.post_editProduct);
module.exports = router;
