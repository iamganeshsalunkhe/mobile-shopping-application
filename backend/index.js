// import required modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// importing routes
// vendorsRoutes
const vendorAuthRoutes = require('./routes/vendorRoutes/vendorAuthRoutes');
const vendorProductRoutes = require("./routes/vendorRoutes/vendorProductRoutes");
const vendorProfileRoutes = require("./routes/vendorRoutes/vendorProfileRoutes");

// customerRoutes
const customerAuthRoutes = require('./routes/customerRoutes/customerAuthRoutes.js');
const customerProfileRoutes = require('./routes/customerRoutes/customerProfileRoutes.js');
const customerAddressRoutes = require('./routes/customerRoutes/customerAddressRoutes.js');
const customerProductRoutes = require('./routes/customerRoutes/customerProductRoutes.js');
const customerCartRoutes = require('./routes/customerRoutes/customerCartRoute.js');
const customerOrderRoutes = require('./routes/customerRoutes/customerOrderRoute');

// config the dotenv
dotenv.config();

// initiate port
const PORT = process.env.PORT || 8001;

// initiating app
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173",credentials:true}))

app.use('/api/vendor',[vendorAuthRoutes,vendorProductRoutes,vendorProfileRoutes]);
app.use('/api/customer',[customerAuthRoutes,customerProfileRoutes,customerAddressRoutes,customerProductRoutes,customerCartRoutes,customerOrderRoutes]);

// listening 
app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`)
});
