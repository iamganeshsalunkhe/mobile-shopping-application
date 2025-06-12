// import required module
const {Products} = require('../../models');


// get all products (irrespective of vendor to showcase on FE)
exports.allProducts = async()=>{
    // get all products from the data base
    const products = await Products.findAll();

    return products;
}

//get specific product using productId
exports.getSpecificProduct = async(productId) =>{
    // get productId from the controller layer
    const product = await Products.findByPk(productId);

    // return the product
    return product;
};