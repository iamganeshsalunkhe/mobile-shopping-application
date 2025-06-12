// import required module
const {Products} = require('../../models');


// get all products (irrespective of vendor to showcase on FE)
exports.allProducts = async()=>{
    // get all products from the data base
    const products = await Products.findAll();

    return products;
}