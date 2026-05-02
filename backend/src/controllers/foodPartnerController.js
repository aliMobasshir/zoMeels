const foodPartnerModel = require("../models/foodPartnerModel");
const foodModel = require("../models/foodModel");


async function getCurrentFoodPartner(req, res) {
    if (!req.foodPartner) {
        return res.status(401).json({ message: "unauthorised access" });
    }

    res.status(200).json({
        foodPartner: req.foodPartner
    });
}


async function getFoodPartnerById(req,res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)

    const foodItemsByFoodPartner = await foodModel.find({foodPartner : foodPartnerId})

    if(!foodPartner) {
        return res.status(404).json({message : "food partner not found"})
    }

    res.status(200).json({foodPartner,foodItemsByFoodPartner})
}

module.exports = {
    getCurrentFoodPartner,
    getFoodPartnerById
}
