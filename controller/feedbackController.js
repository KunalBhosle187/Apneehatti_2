const asyncHandler = require("express-async-handler");
const Feedback = require("../models/feedbackModel");

const addFeedback  = asyncHandler (async(req, res) =>{
    const{feedback , userInfo} = req.body;

        const userFeedback = new Feedback({
            user:req.user._id,
            feedback,
            userInfo
        })
        const saveFeedback = await userFeedback.save() 
        res.status(201).json(saveFeedback)
        console.log(saveFeedback)
    }
)

module.exports = {addFeedback}