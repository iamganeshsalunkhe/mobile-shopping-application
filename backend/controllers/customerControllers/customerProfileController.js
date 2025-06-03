// import required modules
const customerProfileServices = require('../../services/customerServices/customerProfileService');

exports.getProfile = async(req,res)=>{
    try {
      // get vendorId from token
      const  customerId  = req.user.id;

      // pass the details to service layer
      const customerData = await customerProfileServices.getProfileDetails(customerId);

      // if request handled successfully
      res.status(200).json(customerData);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!!"})
    }
}