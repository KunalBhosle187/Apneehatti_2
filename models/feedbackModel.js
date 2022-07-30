const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    feedback:{
        type:Object,
        required:true
    },
    userInfo:{
        type:Object,
        required:true
    }
   
},{timestamps:true})

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback ;