const express = require('express');
const router = express.Router();

const authController = require("../controllers/authController")

//user auth apis
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.post("/user/logout",authController.logoutUser);

//food partner auth apis
router.post("/foodPartner/register", authController.registerFoodPartner);
router.post("/foodPartner/login", authController.loginFoodPartner);
router.post("/foodPartner/logout", authController.logoutFoodPartner);

module.exports = router;