const foodPartnerModel = require('../models/foodPartnerModel');
const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken');

async function authFoodPartnerMiddleware(req,res,next){
    const token = req.cookies.token;

    if(!token) {
      return  res.status(401).json({
            message : "unauthorised access"
        })
    }

   try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const foodPartner = await foodPartnerModel.findById(decoded.id)

    req.foodPartner = foodPartner //creating a property inside req
    next();
    
   } catch (error) {
    res.status(401).json({
        message : "invalid token"
    })
   }
}

async function authUserMiddleware(req,res,next){
    const token = req.cookies.token;

    if(!token) {
      return  res.status(401).json({
            message : "please login first"
        })
    }

   try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id)

    req.user = user //creating a property inside req
    next();
    
   } catch (error) {
    res.status(401).json({
        message : "invalid token"
    })
   }
}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}