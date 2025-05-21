// import required files
const express = require('express');
const vendorAuthController = require('../../controllers/vendorControllers/vendorAuth.controller');
const  authenticate = require('../../middleware/authenticate');
// initiate router instance 
const router = express.Router();

// signup route
router.post('/signup',vendorAuthController.signup);

// login route
router.post('/login',vendorAuthController.login);

router.post('/logout', vendorAuthController.logout);


// export router 
module.exports = router;