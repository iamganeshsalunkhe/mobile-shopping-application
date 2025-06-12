//import required modules
const { registerCustomer, loginCustomer } = require("../../services/customerServices/customerAuthService")

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

// login a customer 
exports.login = async(req,res)=>{
    try {
        // get customer info and assign token
        const {LoggedCustomer } = await loginCustomer(req);
        res.cookie('token',LoggedCustomer.token,{
            httpOnly:true,
            maxAge:3600000,
            secure:false,
            sameSite:"Lax"
        })
        res.status(200).json({message:"Customer logged in successfully!",LoggedCustomer})
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json({message:error.message ||"Something went wrong!!"})
    }
}
exports.logout = async(req,res) =>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            sameSite:"Lax"
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Something went wrong!"})
    }
}