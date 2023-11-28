//custom modules
const ApiError = require("../utils/ApiError");
//models
const User = require("../models/user.model");
const Category = require("../models/category.model");

//all users
exports.get_users = async (req, res, next) => {
    const user = await User.find();
    const userCount = await User.count();
    try {
        if (userCount == 0) {
            return res.render("partials/404", {
                title: "Kullanıcı Yok"
            });
        }

        res.render("user/user-list", {
            title: "Kullanıcılar",
            users: user,
            userCount: userCount
        });


    } catch (error) {
        return next(new ApiError(error, 400))
    }
}

//update specific user
exports.get_updateUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    const categories = await Category.find();
    try {
        res.render("user/user-edit", {
            title: user.name + "adlı kullanıcı güncelleniyor",
            user: user,
            categories: categories
        });

    } catch (error) {
        return next(new ApiError(error, 400));
    }
}
exports.post_updateUser = async (req, res, next) => {
    const { name, email, role } = req.body;
    let image = "default-avatar.png"
    if (req.file) {
        image = req.file.filename;
    }
    console.log(req.body);
    try {
        const user = await User.findByIdAndUpdate(req.body.userId, { name: name, email: email, role: role, profileImage: image }, { new: true });
        return res.redirect("/users");
    } catch (error) {
        return next(new ApiError(error, 400));
    }
}
