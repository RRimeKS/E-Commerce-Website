const ApiError = require("../utils/ApiError");
//models
const Category = require("../models/category.model");
const Product = require("../models/product.model");

exports.get_specifcProduct = async (req, res, next) => {
    const productName = req.params.name;
    const product = await Product.findOne({ slug: productName }).populate("reviews");
    const categories = await Category.find();
    try {
        if (!product) {
            return res.render("homepage/specifc-product", {
                title: product.title,
                errors: [{ msg: "Aradığınız ürün bulunamadı" }]
            });
        }
        res.render("homepage/specifc-product", {
            title: product.title,
            categories: categories,
            product: product,
            selectedCategory: null
        });

        req.session.productId = product._id;
    } catch (error) {
        return next(new ApiError(error, 400));
    }
}

exports.get_selectedCategoryProduct = async (req, res, next) => {
    const slug = req.params.slug;
    const specificCategory = await Category.find({ slug: slug });
    const id = specificCategory[0]._id.toString();
    const products = await Product.find({ category: id });

    const category = await Category.find();
    try {
        res.render("homepage/index", {
            title: specificCategory[0].name,
            products: products,
            categories: category,
            selectedCategory: id
        });

    } catch (error) {
        return next(new ApiError(error, 400));
    }
}

exports.homepage = async (req, res, next) => {
    const categories = await Category.find();
    const product = await Product.find();

    try {
        res.render("homepage/index", {
            title: "Anasayfa",
            categories: categories,
            products: product,
            selectedCategory: null
        });
    } catch (error) {
        return next(new ApiError(error, 400))
    }
}