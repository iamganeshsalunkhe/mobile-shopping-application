// import required modules
const {Orders,Products,Addresses} = require('../../models');

exports.placeOrder = async(customerId,orderData) =>{
    // got customerId, productId from the controller layer

    // destructure data 
    const {amountPaid,transactionId,dateOfOrderPlaced,productId,vendorId,addressId} = orderData;

    // create a new order in db
    const order = await Orders.create({
        customerId:customerId,
        productId,
        vendorId,
        addressId,
        amountPaid,
        transactionId,
        dateOfOrderPlaced
    });

    // return newly created order
    return order;
};

// get all order for the customer
exports.getOrder = async(customerId)=>{
    // got the customerId from controller layer
    const ordersData = await Orders.findAll({where:{customerId},
        include:[
            {
                model:Products,
                attributes:['productId',"productName"]
            }
        ]
    });

    // return the data
    return ordersData;
};

exports.getAnOrder = async(orderId)=>{
    // got the  orderId from the controller layer

    // find the order by orderId in db
    const order = await Orders.findOne({
      where: { orderId },
      include: [
        {
          model: Products,
          attributes: ["productName", "specification"],
        },
        {
            model: Addresses,
            attributes: ["addressLine", "city", "district", "postalCode"],
        }
      ],
    });

    // return to the controller layers
    return order;
};

exports.getOrderStatus = async (orderId)=>{
    
    const order = await Orders.findOne({where:{orderId}});
    
    return order?.status;

}