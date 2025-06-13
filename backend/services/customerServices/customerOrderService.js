// import required modules
const {Orders} = require('../../models');

exports.placeOrder = async(customerId,orderData) =>{
    // got customerId, productId from the controller layer

    // destructure data 
    const {amountPaid,transactionId,dateOfOrderPlaced,productId} = orderData;

    // create a new order in db
    const order = await Orders.create({
        customerId:customerId,
        productId,
        amountPaid,
        transactionId,
        dateOfOrderPlaced
    });

    // return newly created order
    return order;
};