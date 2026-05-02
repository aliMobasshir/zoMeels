const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    video : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    foodPartner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "foodPartner"
    },
    likesCount : {
        type : Number ,
        default : 0
    },
    savedCount : {
        type : Number ,
        default : 0
    }

})

const foodModel = mongoose.model("foodModel" , foodSchema);
module.exports = foodModel