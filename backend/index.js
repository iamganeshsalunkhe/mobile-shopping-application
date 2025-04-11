// import required modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// importing routes
const vendorAuthRoutes = require('./routes/vendorRoutes/vendorAuth.routes');
const vendorProductRoutes = require("./routes/vendorRoutes/vendorProduct.routes");
const vendorProfileRoutes = require("./routes/vendorRoutes/vendorProfile.routes");

// config the dotenv
dotenv.config();

// initiate port
const PORT = process.env.PORT || 8001;

// initiating app
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/vendor',[vendorAuthRoutes,vendorProductRoutes,vendorProfileRoutes]);

// listening 
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});
