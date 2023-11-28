const validatorMiddleware = require("../../middlewares/validator.middleware");
const { check, body } = require("express-validator");
const slugify = require("slugify");

exports.getOneValidator = [
  check("id").isMongoId(),
];

exports.createProductValidator = [
  check("title").notEmpty().withMessage("Ürün adını boş geçilemez").isLength({ min: 3 }).withMessage("Ürün ismi 3 harften kısa olamaz"),
  check("description").notEmpty().withMessage("Ürün açıklaması boş geçilemez").isLength({ min: 3 }).withMessage("Ürün açıklaması 3 harften kısa olamaz"),
  check("quantity").notEmpty().withMessage("Ürün miktarı boş geçilemez"),
  check("price").notEmpty().withMessage("Ürün fiyatı boş geçilemez"),
  check("category").notEmpty().withMessage("Kategori seçilmelidir"),
  check("color").notEmpty().withMessage("Ürün rengi seçilmelidir"),
  check("imageCover").optional(),
  check("images").optional(),
  validatorMiddleware,
];

exports.updateCategoryValidator = [
  check("title").notEmpty().withMessage("Ürün adını boş geçilemez").isLength({ min: 3 }).withMessage("Ürün ismi 3 harften kısa olamaz"),
  check("description").notEmpty().withMessage("Ürün açıklaması boş geçilemez").isLength({ min: 3 }).withMessage("Ürün açıklaması 3 harften kısa olamaz"),
  check("quantity").notEmpty().withMessage("Ürün miktarı boş geçilemez"),
  check("price").notEmpty().withMessage("Ürün fiyatı boş geçilemez"),
  check("category").notEmpty().withMessage("Kategori seçilmelidir"),
  check("color").notEmpty().withMessage("Ürün rengi seçilmelidir"),
  check("imageCover").optional(),
  check("images").optional(),
  validatorMiddleware,
];
