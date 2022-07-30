const express = require("express");
const {addFeedback} = require('../controller/feedbackController')
const {protect} = require('../middleware/authMiddleware')
const router = express.Router();


// ADD FEEDBACK
router.route('/').post(protect, addFeedback);

module.exports = router ;