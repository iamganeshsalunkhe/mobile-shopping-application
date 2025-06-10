// import required module
const express = require("express");
const customerProfileController = require("../../controllers/customerControllers/customerProfileController");
const authenticate = require('../../middleware/authenticate');
// initiate a router instance
const router = express.Router();

// get profile route
router.get('/account',authenticate,customerProfileController.getProfile);

// update the profile of customer
router.post('/account',authenticate,customerProfileController.updateProfile);

// export module
module.exports = router;