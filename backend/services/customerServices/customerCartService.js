// import required modules
const {Cart} = require('../../models');

// add  a product to the cart
exports.addToCart =async (customerId,productId)=>{
    // get customerId and productId from the controller layer
    

    // check if product already exists in cart or not
    const existingItem = await Cart.findOne({where:{customerId,productId}});

    // if product already in the cart
    if (existingItem) throw new Error ("Product already in the cart");

    // if product not present in the cart then add it to cart
    const newItem = await Cart.create({customerId,productId});

    // return to the controller layer
    return newItem;
};