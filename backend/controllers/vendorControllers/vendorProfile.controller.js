// import required files
const vendorProfileServices = require('../../services/vendorServices/vendorProfile.service');

// get vendor details

exports.profileDetails = async (req,res)=>{
    try {
        // get vendorId from token
        const vendorId = req.user.id;
        console.log(vendorId);

        // pass the data to the service layer
        const vendorData  = await vendorProfileServices.getVendorDetails(vendorId);

        // if request successfully handled
        res.status(200).json(vendorData);
    } catch (error) {
        // if any error occurs
        res
          .status(error.statusCode || 500)
          .json({ message: error.message || "Something went wrong" });
    }
};