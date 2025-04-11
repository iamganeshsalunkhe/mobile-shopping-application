// import required files
const express = require('express');
const vendorAuthController = require('../../controllers/vendorControllers/vendorAuth.controller');
const vendorProductController = require('../../controllers/vendorControllers/vendorProduct.controller');
const vendorProfileController = require('../../controllers/vendorControllers/vendorProfile.controller');
const authenticate = require("../../middleware/authenticate");

// initiate router instance 
const router = express.Router();

// signup route
router.post('/signup',vendorAuthController.signup);

// login route
router.post('/login',vendorAuthController.login);

// get all products
router.get('/products',authenticate,vendorProductController.getAllProducts);

// add a product
router.post('/product',authenticate,vendorProductController.newProduct);

// update a product
router.put('/product/:productId',authenticate,vendorProductController.updateProduct);

// delete a product
router.delete('/product/:productId',authenticate,vendorProductController.deleteProduct);

// get profile details
router.get('/account',authenticate,vendorProfileController.profileDetails);

// update vendor profile details
router.put('/account',authenticate,vendorProfileController.updateAccount);

// export router 
module.exports = router;