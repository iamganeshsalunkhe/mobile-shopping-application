const customerAddressService = require('../../services/customerServices/customerAddressService');


exports.addNewAddress = async(req,res)=>{
    try {
        // get the customerid from the token
        const customerId = req.user.id;

        // pass the data to the service layer
        
        const newAddress = await customerAddressService.addAddress(customerId,req); 

        // if request handled successfully
        res.status(201).json({message:"Address added successfully!",newAddress})
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message ||"Something went wrong!"});
    };
};

// get all address for a customer
exports.getAllAddresses = async(req,res)=>{
    try {
        //get the customerId from the token
        const customerId = req.user.id;

        // pass it to the service layer
        const allAddresses = await customerAddressService.getAddress(customerId);
        
        // if request handled successfully
        res.status(200).json(allAddresses);
    } catch (error) {
        // if any error occurs
        console.error(error);
        res.status(500).json({message:error.message || "Something went wrong!"})
    }
};