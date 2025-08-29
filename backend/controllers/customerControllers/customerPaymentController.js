// import required modules
const customerPaymentService = require('../../services/customerServices/customerPaymentService');

exports.createOrder = async(req,res)=>{
    try {
        // get customerId from cookies
        const customerId = req.user.id;

        // pass it to the service layer
        const order =await customerPaymentService.orderToCreated(customerId);

        // if request handled successfully
        res.status(200).json(order);
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
};

