//import required modules
const { registerCustomer } = require("../../services/customerServices/customerAuthServices")

// signup a new customer
exports.signUp = async(req,res)=>{
    try {
        // with data send the request to service layer
        const customer = await registerCustomer(req);
        res.status(201).json({message:'Customer registered Successfully!',customer})
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(error.statusCode || 500).json({message:error.message || 'something went wrong!'})
    }
}