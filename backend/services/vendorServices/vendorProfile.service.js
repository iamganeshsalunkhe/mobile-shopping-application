// import required files
const {Vendors}= require('../../models');

// get specific vendor details

exports.getVendorDetails = async(vendorId) =>{
    // find the vendor using vendorId
    const vendorDetails = await Vendors.findByPk(vendorId);
    // as we allowing vendor to fetch details only if while logged in hence no need handle "vendor not found scenario"

    return vendorDetails;
}