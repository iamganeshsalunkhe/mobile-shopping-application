// import required modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// importing routes
const vendorRoutes = require('./routes/vendorRoutes/vendor.routes');

// config the dotenv
dotenv.config();

// initiate port
const PORT = process.env.PORT || 8001;

// initiating app
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/vendor',vendorRoutes)

// listening 
app.listen(PORT,'localhost',()=>{
    console.log(`Server listening on port ${PORT}`)
});
