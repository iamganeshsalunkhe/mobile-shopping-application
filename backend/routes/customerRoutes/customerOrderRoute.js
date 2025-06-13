// import required modules
const express = require('express');
const customerOrderController = require('../../controllers/customerControllers/customerOrderController');
const authenticate = require('../../middleware/authenticate');

// initiate a router instance
const router = express.Router();

// place an order
router.post('/order',authenticate,customerOrderController.placeOrder);


// export router
module.exports = router;