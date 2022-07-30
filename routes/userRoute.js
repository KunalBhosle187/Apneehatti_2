const express = require("express");
const { authController, getUserProfile, registerUser , updateUserProfile, emailSend, changePassword} = require("../controller/userController")
const {protect} = require("../middleware/authMiddleware")


const router = express.Router();

//Registration
router.route('/').post(registerUser);


// Post data
router.post("/login", authController);


// GET USER PROFILE PRIVATE ROUTE
router.route("/profile")
.get(protect,getUserProfile)
.put(protect , updateUserProfile)


// FORGET PASSWORD FUNCTIONALITY
router.route('/emailsend').post(emailSend);


router.route('/changepassword').post(changePassword)

module.exports = router ;