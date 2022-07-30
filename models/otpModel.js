const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    expireIn:{
        type:Number,
        required:true
    }
  
},{
    timestamps:true
})

const Otp = mongoose.model("Otp", otpSchema);

module.exports = Otp ;