// import required modules
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// config the dotenv
dotenv.config();

// initiate port
const PORT = process.env.PORT || 8001;

// initiating app
const app = express();

app.use(bodyParser.json());


// listening 
app.listen(PORT,'localhost',()=>{
    console.log(`Server listening on port ${PORT}`)
});
