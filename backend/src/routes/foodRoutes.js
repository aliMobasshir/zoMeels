const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const foodController = require('../controllers/foodController');
const multer = require('multer');

const upload = multer({
    storage : multer.memoryStorage(),
})

// api/auth/   , protected
router.post("/",authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood); //create

router.get("/",authMiddleware.authUserMiddleware, foodController.getFoodItems); // feed

router.post("/like",authMiddleware.authUserMiddleware, foodController.likeFood) //like video

router.post("/save",authMiddleware.authUserMiddleware, foodController.saveFood); //save food

router.get("/saved",authMiddleware.authUserMiddleware, foodController.getSavedFood)

module.exports = router