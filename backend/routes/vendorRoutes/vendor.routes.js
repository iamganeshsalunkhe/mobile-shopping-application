// import required files
const express = require('express');
const vendorAuthController = require('../../controllers/vendorControllers/vendorAuth.controller');
const vendorProductController = require('../../controllers/vendorControllers/vendorProduct.controller');
const authenticate = require("../../middleware/authenticate");

// initiate router instance 
const router = express.Router();

// signup route
router.post('/signup',vendorAuthController.signup);

// login route
router.post('/login',vendorAuthController.login);


// add a product
router.post('/product',authenticate,vendorProductController.newProduct);

// update a product
router.put('/product/:productId',authenticate,vendorProductController.updateProduct);

// export router 
module.exports = router;