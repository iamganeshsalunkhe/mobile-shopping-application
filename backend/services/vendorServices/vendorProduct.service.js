// import required modules
const {Products} = require('../../models');
const { putObject } = require('../../utils/putObject');

// get all products(self-listed)
exports.AllProducts = async(vendorId) =>{
    // find the all products with authorized vendorId
    const AllProducts = await Products.findAll({where:{vendorId}});
    
    // return the object
    return AllProducts;
};

// add a new product 
exports.createProduct = async(productData)=>{
    // create product 

    const product = await Products.create(productData);

    const {url,key} = await putObject(productData.file,productData.fileName)


    if (!url || !key) {
        return res.status(400).json({error:"Pls upload image"})
    }
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
};

exports.deleteProduct = async(productId) =>{
    // delete the product with the same productId
    const productToDelete = await Products.findByPk(productId);

    if (!productToDelete) {
      const error = new Error("Product not found!!");
      error.statusCode = 404;
      throw error;
    }

    //delete the product
    return await productToDelete.destroy();

};