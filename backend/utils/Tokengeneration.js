// import required modules
const jwt = require('jsonwebtoken');

// function to generate token

function generateAuthToken (user){
    const token = jwt.sign({
        id:user.vendorId, role:'vendor'
    },
        // secret key for token
        process.env.JWT_SECRET,

        // token expiration time
        {expiresIn:'1h'}
    )
    return token;
}

module.exports = generateAuthToken;