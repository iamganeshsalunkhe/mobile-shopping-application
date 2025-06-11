// import required modules
const express = require('express');
const customerAddressController = require('../../controllers/customerControllers/customerAddressController');
const authenticate = require('../../middleware/authenticate');

// initiate a router instance
const router = express.Router();

// add an address
router.post('/address',authenticate,customerAddressController.addNewAddress);

// get an address
router.get('/address',authenticate,customerAddressController.getAllAddresses);

module.exports = router;