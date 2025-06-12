// import required modules
const express = require('express');
const customerProductController = require('../../controllers/customerControllers/customerProductController');

// initiate a router instance
const router = express.Router();

// get all products
router.get('/allProducts',customerProductController.getAllProducts);


// export module
module.exports = router;