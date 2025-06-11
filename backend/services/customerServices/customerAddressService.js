// import required modules
const {Addresses} = require('../../models');

// add a new address
exports.addAddress = async(customerId,req)=>{
    // get the customerId and data from the controller
    console.log(req.body);
    console.log(customerId);
    const {fullName,contactNumber,addressLine,city, state, postalCode, country, addressType} = req.body;

    // create a new entry in db
    const addressToAdd = await Addresses.create({
        customerId:customerId,
        fullName,
        contactNumber,
        addressLine,
        city,
        state,
        postalCode,
        country,
        addressType
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