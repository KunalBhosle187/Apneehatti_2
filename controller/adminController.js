const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken")




//login
const authAdminController =  asyncHandler(async (req, res) => {
   const { email , password } = req.body;
   const admin = await Admin.findOne({email});
   if(admin && (await admin.matchPassword(password))){
        res.json({
           _id: admin._id,
           name:admin.name,
           email:admin.email,
           isAdmin:admin.isAdmin,
           token:generateToken(admin._id)
       })
   }else{
       res.status(401)
       throw new Error("Invalid Email or Password")
   }
});







  
 

module.exports = { authAdminController  };