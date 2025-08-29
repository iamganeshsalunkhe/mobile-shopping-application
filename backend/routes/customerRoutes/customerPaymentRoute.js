// import required modules
const express = require('express');
const paymentController = require('../../controllers/customerControllers/customerPaymentController.js');
const authenticate = require("../../middleware/authenticate.js")


const router = express.Router();


router.post("/createOrder",authenticate,paymentController.createOrder);



module.exports = router;


