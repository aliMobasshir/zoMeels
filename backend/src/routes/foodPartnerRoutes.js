const express = require('express');
const foodPartnerController = require('../controllers/foodPartnerController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get("/me",
    authMiddleware.authFoodPartnerMiddleware,
    foodPartnerController.getCurrentFoodPartner)

router.get("/:id",
    foodPartnerController.getFoodPartnerById)

module.exports = router
