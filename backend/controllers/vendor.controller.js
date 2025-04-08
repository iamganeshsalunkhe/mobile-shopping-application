// import required files
const vendorService = require('../services/vendor.service');

// registering a new vendor
exports.signup = async (req,res)=>{
    try {
        const vendor = await vendorService.registerVendor(req.body);
        res.status(201).json({message:'Vendor registered successfully', vendor});
    } catch (error) {
        //if any error occurs
        res.status(error.statusCode).json({message:error.message});
    }
};

// login for vendor
exports.login = async (req,res) =>{
    try {
        // get vendor and assign a token
        const vendor = await vendorService.loginVendor(req.body);
        res
        .cookie('token',vendor.token,{httpOnly:true})
        .status(200)
        .json({message:"Login successful",vendor})
    } catch (error) {
        // if any error occurs
       res.status(error.statusCode).json({message:error.message});
    }
};