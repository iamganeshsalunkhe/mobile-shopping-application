// import required modules
const {Products} = require('../../models');

// add a new product 
exports.createProduct = async(productData)=>{
    // create product 

    const product = await Products.create(productData);
    
    return product;
}