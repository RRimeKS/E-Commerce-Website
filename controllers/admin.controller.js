//custom modules
const ApiError = require("../utils/ApiError");
//models
const Category = require("../models/category.model");

exports.get_adminPanel = async (req, res, next) => {
    try {
        res.render("admin/admin-panel", {
            title: "Admin Paneli"
        });

    } catch (error) {
        return next(ApiError(error, 400));
    }
}