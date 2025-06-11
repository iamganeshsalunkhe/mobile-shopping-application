// import required files
const express = require('express');
const vendorProductController = require("../../controllers/vendorControllers/vendorProductController");
const authenticate = require("../../middleware/authenticate");

// initiate router instance 
const router = express.Router();

// get all products
router.get('/products',authenticate,vendorProductController.getAllProducts);

// add a product
router.post('/product',authenticate,vendorProductController.newProduct);

// update a product
router.put('/product/:productId',authenticate,vendorProductController.updateProduct);

// delete a product
router.delete('/product/:productId',authenticate,vendorProductController.deleteProduct);

// export router 
module.exports = router;