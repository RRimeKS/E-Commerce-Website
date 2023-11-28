// express
const express = require("express");
const router = express.Router();
//controller
const authController = require("../controllers/auth.controller");
//validators - middlewares
const imageUpload = require("../middlewares/uploadImage.middleware");


router.get("/signin", authController.get_login);
router.post("/signin", authController.post_login);

router.get("/signup", authController.get_register);
router.post("/signup", authController.post_register);

router.get("/logout", authController.get_logout);

router.get("/reset-password", authController.get_resetPassword);
router.post("/reset-password", authController.post_resetPassword);

router.get("/verify-code", authController.get_verifyCode);
router.post("/verify-code", authController.post_verifyCode);

router.get("/new-password/:token", authController.get_newPassword);
router.post("/new-password/:token", authController.post_newPassword);
module.exports = router;