// import required modules
const {Addresses} = require('../../models');

// add a new address
exports.addAddress = async(customerId,req)=>{
    // get the customerId and data from the controller
    console.log(req.body);
    console.log(customerId);
    const {fullName,contactNumber,addressLine,landMark,city,district, state, postalCode, country, addressType,isDefault} = req.body;

    // create a new entry in db
    const addressToAdd = await Addresses.create({
        customerId:customerId,
        fullName,
        contactNumber,
        addressLine,
        landMark,
        city,
        district,
        state,
        postalCode,
        country,
        addressType,
        isDefault
    });

    // return new address to controller level
    return addressToAdd;

};

// get all address for that customer
exports.getAddress = async(customerId)=>{
    // get the customerId from the controller layer
    const allAddresses = await Addresses.findAll({where:{customerId}});
    
    // return the all addresses to the service layer
    return allAddresses;
};

// update an address 
exports.updateAddress = async(customerId, addressId, data)=>{
    // get customerId, addressId, data from the controller layer
    const address = await Addresses.findOne({
        where:{
            customerId:customerId,
            addressId:addressId
        }
    })
    
    // if address not found
    if (!address){
        throw new Error("Address not found")    
    }
    
    // update the address
    const updatedAddress =  await address.update(data)

    // return to controller layer
    return updatedAddress;
};

exports.deleteAddress = async(customerId, addressId)=>{
    // get the customerId and addressId from the controller layer

    // find the address in db using customerId, addressId
    const address = await Addresses.findOne({where:{
        customerId:customerId,
        addressId:addressId
    }});
    
    if (!address){
        throw new Error("Address not found")
    }

    // delete the address
    return await address.destroy();
}