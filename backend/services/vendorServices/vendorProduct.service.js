// import required modules
const {Products} = require('../../models');

// get all products(self-listed)
exports.AllProducts = async(vendorId) =>{
    // find the all products with authorized vendorId
    const AllProducts = await Products.findAll({where:{vendorId}});
    
    // return the list/object
    return AllProducts;
}

// add a new product 
exports.createProduct = async(productData)=>{
    // create product 

    const product = await Products.create(productData);
    
    return product;
};

// for updating a product
exports.updateProduct = async(productId, data)=>{
    // get product by productId
    const product = await Products.findByPk(productId);

    if (!product){
        const error = new Error('Product not found!!')
        error.statusCode = 404;
        throw error;
    }

    return await product.update(data);
}