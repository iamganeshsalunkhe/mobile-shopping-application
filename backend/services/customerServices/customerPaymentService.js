// import required modules
const rzp = require("../../lib/razorpay");
const { Cart, Addresses, Products,Orders} = require("../../models");

exports.orderToCreated = async (customerId) => {

  // find the default address for customer
  const deliveryAddress = await Addresses.findOne({
    where: { customerId, isDefault: true },
  });
  
  // if no default address found
  if (!deliveryAddress) throw new Error("No default address found!!");


  // get cart info with product details
  const cartInfo = await Cart.findAll({
    where: { customerId },
    include: [
      {
        model: Products,
        as: "product",
        attributes: ["productId", "productName", "price", "vendorId"],
      },
    ],
  });

  // if cart is empty
  if (!cartInfo.length) throw new Error ("Cart is empty!!");

  // calculate total amount for products in the cart
   const totalAmount = cartInfo.reduce((sum,item)=>{
    return sum + item.quantity * item.product.price
   },0);


   // create an entry in orders table
   const createOrder = await Orders.create({
    customerId,
    shippingName:deliveryAddress.fullName,
    shippingEmail:deliveryAddress.email,
    shippingPhone:deliveryAddress.contactNumber,
    shippingStreet:deliveryAddress.addressLine +" " + deliveryAddress.landMark,
    shippingCity:deliveryAddress.city,
    shippingDistrict:deliveryAddress.district,
    shippingState:deliveryAddress.state,
    shippingPincode:deliveryAddress.postalCode,
    totalAmount,
    status:"PENDING_PAYMENT",
   })

    // get generated orderId
   const orderId =  createOrder.orderId;
   
   // create razorpayOrder
   const razorpayOrder = await rzp.orders.create({
    amount:totalAmount * 100, // convert to paise 
    currency:"INR",
  });

  // update the razorpayOrderId in order table
  await createOrder.update({
    razorpayOrderId:razorpayOrder.id
  });

  return {
    orderId,
    razorPayOrderId: razorpayOrder.id,
    amount: totalAmount,
    currency: "INR",
    status: "PENDING_PAYMENT",
    key: process.env.razorPay_key,

    // return to prefill field in FE
    customer: {
      name: deliveryAddress.fullName,
      email: deliveryAddress.email,
      contactNumber: deliveryAddress.contactNumber,
    },
  };
};
