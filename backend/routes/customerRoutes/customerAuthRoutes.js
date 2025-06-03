// import required modules
const express = require('express');
const customerAuthController = require('../../controllers/customerController.js/customerAuthController');

// initiate a router instance
const router = express.Router();

// sign up route
router.post('/signup', customerAuthController.signUp);

// login route
router.post('/login',customerAuthController.login);

// logout route
router.post('logout',customerAuthController.logout);

// export router
module.exports = router;