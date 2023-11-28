// express
const express = require("express");
const router = express.Router();
//controller - middlewares
const reviewController = require("../controllers/reviews.controller");
const isAuth = require("../middlewares/isAuth");
const reviewValidator = require("../utils/validators/review.validator");

router.get("/create/review/:productId", isAuth, reviewController.get_createReview);
router.post("/create/review/:productId", isAuth, reviewValidator.createReviewValidator, reviewController.post_createReview);

module.exports = router;