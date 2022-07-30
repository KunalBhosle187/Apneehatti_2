const express = require("express");
const { authAdminController} = require("../controller/adminController")


const router = express.Router();


// Post data
router.post("/adminlog", authAdminController);



module.exports = router ;