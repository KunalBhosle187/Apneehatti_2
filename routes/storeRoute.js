const express = require("express");
const {getStores} = require("../controller/storeController")
const {protect} = require("../middleware/authMiddleware")


const router = express.Router();
// GET ROUTE FOR ALL STORES
router.route("/store").get(getStores)




module.exports = router ;