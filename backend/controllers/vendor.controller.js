// import required files
const vendorService = require('../services/vendor.service');

exports.signup  = async (req,res)=>{
    try {
        const vendor = await vendorService.registerVendor(req.body);
        res.status(201).json({message:'Vendor registered successfully', vendor});
    } catch (error) {
        console.error(error)
    }
}