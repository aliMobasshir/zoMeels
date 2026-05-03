const userModel = require('../models/userModel');
const foodPartnerModel = require('../models/foodPartnerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function getCookieOptions() {
    const isProduction = process.env.NODE_ENV === 'production';

    return {
        httpOnly: true,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction
    };
}

async function registerUser(req,res) {
    const { fullname, name, email, password } = req.body;
    const resolvedFullname = fullname || name;

    if (!resolvedFullname || !email || !password) {
        return res.status(400).json({
            message : "fullname, email and password are required"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({email});
    
    if(isUserAlreadyExists) {
        return res.status(400).json({
            message : "user already exists"
        })
    }

    let hashedPassword = await bcrypt.hash(password,10);

    let user = await userModel.create({
     fullname : resolvedFullname,
     email,
     password : hashedPassword
    })

    let token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET)

    res.cookie("token",token, getCookieOptions());

    res.status(201).json({
       message : "user registered successfully",
       user : {
       _id : user._id,
       email : user.email,
       fullname : user.fullname
       }
    })

    
}

async function loginUser(req,res) {
const {email,password} = req.body;

let user = await userModel.findOne({email});

if(!user){
    return res.status(401).json({
        message : "Inavalid email or password"
    })
}

const isPasswordValid = await bcrypt.compare(password,user.password);
if(!isPasswordValid) {
    return res.status(401).json({
        message : "Inavalid email or password"
    })
}

let token = jwt.sign({
    id : user._id
},process.env.JWT_SECRET)

res.cookie("token" , token, getCookieOptions());

res.status(201).json({
  message : "user Logged in",
  user : {
    id : user._id,
    email : user.email,
    fullname : user.fullname
  }
})
}

function logoutUser(req,res){
    res.clearCookie("token", getCookieOptions());
    res.status(200).json({
        message : "user logged out succesfully" 
    })
}

async function registerFoodPartner(req,res){
    let {name,email,password,contactName,phone,address} = req.body ;
    let isFoodPartnerAlreadyExists = await foodPartnerModel.findOne({email});

    if(isFoodPartnerAlreadyExists){
      return res.status(400).json({
            message : "user exists"
        })
    }
    let hashedPassword = await bcrypt.hash(password,10);

    let foodPartner = await foodPartnerModel.create({
        name,
        email,
        password : hashedPassword,
        contactName,
        phone,
        address
    })

    let token = jwt.sign({
        id : foodPartner._id,
    },process.env.JWT_SECRET)


    res.cookie("token", token, getCookieOptions());

    res.status(201).json({
        message : "Food Partner registered successfully",
        foodPartner : {
            _id : foodPartner._id,
            name : foodPartner.name,
            contactName : foodPartner.contactName,
            email : foodPartner.email,
            phone : foodPartner.phone,
            address : foodPartner.address
        }
    })
}

async function loginFoodPartner(req,res){
    const {email,password} = req.body ;

    let foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner) {
        return res.status(401).json({
            message : "something went wrong"
        })
    }

    let isPasswordValid = await bcrypt.compare(password,foodPartner.password);

    if(!isPasswordValid) {
        return res.status(401).json({
          message :  "something went wrong"
        })
    }
     
    let token = jwt.sign({
        id : foodPartner._id,
    },process.env.JWT_SECRET)


    res.cookie  ("token",token, getCookieOptions())

    res.status(201).json({
        message : "food partner successfully logged in",
        foodPartner : {
            _id : foodPartner._id,
            name : foodPartner.name ,
            email : foodPartner.email
        }
    })
}

function logoutFoodPartner(req,res){
    res.clearCookie("token", getCookieOptions());
    res.status(200).json({
        message : "food partner logged out successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,

    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner
    }
