const validatorMiddleware = require("../../middlewares/validator.middleware");
const { check, body, validationResult } = require("express-validator");
const slugify = require("slugify");
const express = require('express');

exports.createReviewValidator = [
    check("text").notEmpty().withMessage("Yorum kısmını doldurunuz"),
    check("ratings").notEmpty().withMessage("1 - 5 arasında bir oylamada bulununuz").isNumeric().isLength({ min: 1, max: 5 }),
    check("user").notEmpty().isMongoId(),
    check("product").notEmpty().isMongoId(),
    validatorMiddleware
];
