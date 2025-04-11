// import required files
const {Vendors}= require('../../models');
const {hashPassword} = require('../../utils/Password');

// get specific vendor details

exports.getVendorDetails = async(vendorId) =>{
    // find the vendor using vendorId
    const vendorDetails = await Vendors.findByPk(vendorId);
    // as we allowing vendor to fetch details only if while logged in hence no need handle "vendor not found scenario"

    return vendorDetails;
};

// update the vendor details 
exports.updateVendorAccount = async(vendorId,data) => {
  // get vendor details by vendorId
  const vendor = await Vendors.findByPk(vendorId);

  // if user want to update password
  const newPassword = await hashPassword(data.password);

  // update the vendor with hashed password
  const updatedVendor = { ...data, password: newPassword };
  
  // update the vendor with updated data
  return await vendor.update(updatedVendor);
};

exports.deleteAVendorAccount = async(vendorId) =>{
    // delete a vendor account from db
    const vendorToBeDeleted = await Vendors.findByPk(vendorId);

    // delete the vendor
    return await vendorToBeDeleted.destroy();
}