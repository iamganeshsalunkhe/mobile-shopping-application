// import required files
const express = require('express');
const vendorController = require('../controllers/vendor.controller');

// initiate router instance 
const router = express.Router();

// signup route
router.post('/signup',vendorController.signup);

// login route
router.post('/login',vendorController.login);

// export router 
module.exports = router;