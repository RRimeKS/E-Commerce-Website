// express
const express = require("express");
const router = express.Router();
//controller
const adminController = require("../controllers/admin.controller");

router.get("/admin", adminController.get_adminPanel);

module.exports = router;