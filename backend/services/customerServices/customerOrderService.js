// import required modules
const {Orders,Products,Addresses,OrderItems,Vendors} = require('../../models');

// get all order for the customer
exports.getOrder = async(customerId)=>{
    // got the customerId from controller layer
    const ordersData = await OrderItems.findAll({where:{customerId,status:"CONFIRMED"},
    
        include:[
            {
                model:Vendors
            },
            {
                    model:Orders
            }
        ],
        order:[['updatedAt','DESC']]
    }
    );
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