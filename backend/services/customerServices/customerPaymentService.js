// import required modules
const rzp = require("../../lib/razorpay");
const {
  Cart,
  Addresses,
  Products,
  Orders,
  SubOrders,
  OrderItems,
  Payments
} = require("../../models");
const crypto = require("crypto");

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
  if (!cartInfo.length) throw new Error("Cart is empty!!");

  // calculate total amount for products in the cart
  const totalAmount = cartInfo.reduce((sum, item) => {
    return sum + item.quantity * item.product.price;
  }, 0);

  // create an entry in orders table
  const createOrder = await Orders.create({
    customerId,
    shippingName: deliveryAddress.fullName,
    shippingEmail: deliveryAddress.email,
    shippingPhone: deliveryAddress.contactNumber,
    shippingStreet:
      deliveryAddress.addressLine + " " + deliveryAddress.landMark,
    shippingCity: deliveryAddress.city,
    shippingDistrict: deliveryAddress.district,
    shippingState: deliveryAddress.state,
    shippingPincode: deliveryAddress.postalCode,
    totalAmount,
    status: "PENDING_PAYMENT",
  });

  // get generated orderId
  const orderId = createOrder.orderId;

  // create razorpayOrder
  // send data to razorpay to open payment model in FE
  const razorpayOrder = await rzp.orders.create({
    amount: totalAmount * 100, // convert to paise
    currency: "INR",
  });

  // update the razorpayOrderId in order table
  await createOrder.update({
    razorpayOrderId: razorpayOrder.id,
  });

  

  // group the product by vendor
  const vendorGrouped = cartInfo.reduce((acc, item) => {
    const vendorId = item.product.vendorId;
    // make a new array if not present already
    if (!acc[vendorId]) acc[vendorId] = [];

    // push all details about that item with mapping that vendorId
    acc[vendorId].push(item);

    return acc;
  }, {});

  // loop through vendorGrouped to create suborder and orderItems
  // as vendorGroup is object we can use Object.entries
  for (const [vendorId, items] of Object.entries(vendorGrouped)) {
    // object.entries give us array of items

    // initiate subtotal so we can add it in the table
    let subTotal = 0;

    // create a suborder
    const subOrder = await SubOrders.create({
      orderId,
      vendorId,
      status: "PENDING",
      subTotal: 0,
    });

    // as Object.entries give us array we will loop through it using for..of loop
    // create orderItem(per item as we looping through each item)
    for (const item of items) {
      // calculate totalPrice for a particular item
      const productPrice = Number(item.quantity) * Number(item.product.price);

      // add to subtotal to add in suborder table as full amount for a particular vendor
      subTotal += productPrice;

      // create an entry in orderItems table (per entry per product)
      await OrderItems.create({
        subOrderId: subOrder.subOrderId,
        productName: item.product.productName,
        quantity: item.product.quantity,
        productPrice,
        status: "PENDING",
      });
    }

    //save subtotal for particular vendor in subOrder table
    subOrder.subTotal = subTotal;
    await subOrder.save();
  }

  return {
    orderId,
    razorPayOrderId: razorpayOrder.id,
    amount: totalAmount,
    currency: "INR",
    status: "PENDING_PAYMENT",
    key: process.env.razorPay_key,

    // return to prefill field in FE
    customer: {
      fullName: deliveryAddress.fullName,
      email: deliveryAddress.email,
      contactNumber: deliveryAddress.contactNumber,
    },
  };
};

exports.verify = async (req) => {
  // destructure the data from the req
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body.paymentData;

  // if no data received
  if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return { success: false, message: "Invalid Payment Details Received." };
  } 

  // generate signature to compare with razorpay signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.razorPay_secret_key)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // if signature is mismatched
  if (generatedSignature !== razorpay_signature) return { success: false, message: "Payment verification failed." };

  
  // if signature matches then find order details in our db using razorpayOrderId
  const order = await Orders.findOne({
    where: { razorpayOrderId: razorpay_order_id },
  });

  // didn't  found order details
  if (!order)  return { success: false, message: "Order not found." };

  // if find update the status column
  order.status = "PAID";

  // save the update 
  await order.save();

  // extract the orderId from order details for further use cases
  const orderId = order.orderId;

  // find all suborders linked to that order using orderId
  const subOrders = await SubOrders.findAll({ where: { orderId } });

  // loop over all suborders
  for (const subOrder of subOrders) {
    // update the status column 
    subOrder.status = "CONFIRMED";

    // save the updated value
    await subOrder.save();

    // find the all orderItems for that suborder/order using suborderId
    const orderItems = await OrderItems.findAll({
      where: { subOrderId: subOrder.subOrderId }
    });

    // loop over each orderItem 
    for (const orderItem of orderItems) {
      // update the status column 
      orderItem.status = "CONFIRMED";

      // save the update
      await orderItem.save();
    }
  }

  const PaymentDetails = await rzp.payments.fetch(razorpay_payment_id);
  console.log(PaymentDetails);


  // make an entry in payment table
  const payment = await Payments.create({
    orderId,
    customerId: order.customerId,
    razorpayPaymentId: razorpay_payment_id,
    razorpayOrderId: razorpay_order_id,
    razorpaySignature: razorpay_signature,
    amountPaid: order.totalAmount,
    status: "captured",
    method: "card",
  });

  // if all transaction successful then remove the products from the cart using customerId
  await Cart.destroy({ where: { customerId: order.customerId } });
  
  // return required fields
  return {
    PaymentDetails,
    success: true,
    orderId: order.orderId,
    amount: order.totalAmount,
    paymentId: payment.razorpayPaymentId,
    customerName: order.shippingName,
    customerPhone: order.shippingPhone,
    customerEmail:order.shippingEmail
  };
};