// import required files
const express = require('express');
const vendorAuthController = require('../../controllers/vendorControllers/vendorAuth.controller');

// initiate router instance 
const router = express.Router();

// signup route
router.post('/signup',vendorAuthController.signup);

// login route
router.post('/login',vendorAuthController.login);


// export router 
module.exports = router;