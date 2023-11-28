// express
const express = require("express");
const router = express.Router();
//controller - middlewares
const userController = require("../controllers/user.controller");
const isAdmin = require("../middlewares/isAdmin");
const isModerator = require("../middlewares/isAdmin");
const imageUpload = require("../middlewares/uploadImage.middleware");

//all users
router.get("/users", isModerator, userController.get_users);
//update specific user
router.get("/edit/user/:id", isModerator, userController.get_updateUser);
router.post("/edit/user/:id", isModerator, imageUpload.single("profileImage"), userController.post_updateUser);

module.exports = router;