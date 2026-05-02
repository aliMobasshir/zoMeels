const foodmodel = require('../models/foodModel');
const storageService = require('../services/storageService')
const likeModel = require('../models/likeModel')
const saveModel = require("../models/saveModel")
const { v4:uuid } = require('uuid');
const foodModel = require('../models/foodModel');

async function createFood(req,res){
 
  // console.log(req.foodPartner);
  // console.log(req.body);
  // console.log(req.file);
  
  const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
  // console.log(fileUploadResult);

  const foodItem = await foodmodel.create({
    name : req.body.name,
    description : req.body.description,
    video : fileUploadResult.url,
    foodPartner : req.foodPartner._id

  })
  
  res.status(201).json({
    message : "food item created successfully",
    food : foodItem
  })
}

async function getFoodItems (req,res) {
  const foodItems = await foodmodel.find({});
    
  res.status(200).json({
    message : "food Items fetched successfully",
     foodItems
  })

}

async function likeFood (req,res) {
const { foodId } = req.body;
const user = req.user;

const isAlreadyLiked = await likeModel.findOne({
  user : user._id,
  food : foodId
})

if(isAlreadyLiked){
  await likeModel.deleteOne({
     user : user._id,
  food : foodId
  })

  await foodModel.findByIdAndUpdate(foodId,{
    $inc : {likesCount : -1}
  })

  return res.status(200).json({
    message : "food unliked"
  })
}

const like = await likeModel.create({
  user : user._id,
  food : foodId
})

  await foodModel.findByIdAndUpdate(foodId,{
    $inc : {likesCount : 1}
  })

res.status(201).json({
  message : "food liked successfully",
  like
})

}

async function saveFood (req,res) {
  const {foodId} = req.body
  const user = req.user

  const isAlreadySaved = await saveModel.findOne({
    user : user._id,
    food : foodId
  })

  if(isAlreadySaved) {await saveModel.deleteOne({
  user : user._id,
    food : foodId
  })

   await foodModel.findByIdAndUpdate(foodId,{
    $inc : {savedCount : -1}
  })

  return res.status(200).json({
    message : "Item removed from saved"
  })
}

const saved = await saveModel.create({
  user : user._id,
    food : foodId
})
 await foodModel.findByIdAndUpdate(foodId,{
    $inc : {savedCount : 1}
  })

res.status(201).json({
  message : "food item saved",
  save : saved
})
}

async function getSavedFood(req, res) {
  const user = req.user;

  const savedVideos = await saveModel
    .find({ user: user._id })
    .populate("food"); 

  if (!savedVideos.length) {
    return res.status(200).json({
      message: "No items saved yet",
      savedVideos: [],
    });
  }

  res.status(200).json({
    message: "Saved videos fetched successfully",
    savedVideos 
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedFood
}