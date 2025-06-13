// import required modules
const express = require('express');
const customerOrderController = require('../../controllers/customerControllers/customerOrderController');
const authenticate = require('../../middleware/authenticate');

// initiate a router instance
const router = express.Router();

// place an order
router.post('/order',authenticate,customerOrderController.placeOrder);

// get all orders
router.get('/order',authenticate,customerOrderController.getAllOrders);

// export router
module.exports = router;