const mongoose = require("mongoose");

const saveSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },

    food : {
         type : mongoose.Schema.Types.ObjectId,
        ref : 'foodModel',
        required : true
    }
},{
    timestamps : true 
})

const saveModel = mongoose.model("saveModel" , saveSchema)

module.exports = saveModel