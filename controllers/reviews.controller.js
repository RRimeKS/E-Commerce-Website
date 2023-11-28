//models
const Product = require("../models/product.model");
const Reviews = require("../models/reviews.model");
//custom modules
const ApiError = require("../utils/ApiError");

exports.get_createReview = async (req, res, next) => {
    const product = await Product.findById(req.params.productId);
    try {
        res.render("review/create-review", {
            title: product.title + " adlı ürüne yorum yapılıyor...",
            product: product
        });

    } catch (error) {
        return next(new ApiError(error, 400));
    }
}
exports.post_createReview = async (req, res, next) => {
    const productId = req.body.productId;
    const userId = req.session.userId;
    const product = await Product.findById(productId);
    try {
        const review = await Reviews.create({
            text: req.body.text,
            ratings: req.body.rating,
            user: userId,
            product: productId
        });
        return res.redirect(`/urun/${product.slug}`);

    } catch (error) {
        return next(new ApiError(error, 400));
    }
}