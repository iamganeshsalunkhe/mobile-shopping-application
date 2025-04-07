// import required files
const vendorService = require('../services/vendor.service');

// registering a new vendor
exports.signup = async (req,res)=>{
    try {
        const vendor = await vendorService.registerVendor(req.body);
        res.status(201).json({message:'Vendor registered successfully', vendor});
    } catch (error) {
        // temporary log the error 
        res.status(500).json({message:error.message});
    }
};

// login for vendor
exports.login = async (req,res) =>{
    try {
        const vendor = await vendorService.loginVendor(req.body);
        res.status(200).json({message:"Log in successful", vendor})
    } catch (error) {
        // temporary  log the error
       res.status(500).json({message:error.message});
    }
}