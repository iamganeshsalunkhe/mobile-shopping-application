// import required modules
const {Products,ProductImages} = require('../../models');
const { putObject } = require('../../utils/putObject');


// get all products(self-listed)
exports.AllProducts = async(vendorId) =>{
    // find the all products with authorized vendorId
    const AllProducts = await Products.findAll({where:{vendorId}});
    
    // return the object
    return AllProducts;
};

// add a new product 
exports.createProduct = async(data)=>{
    console.log(data);
    //get data from req
    const {vendorId,productName,specification,price,file} = data;

    if (!file) throw new Error("Product image is required!!")

    // create product 
    const product = await Products.create({vendorId,productName,specification,price:parseFloat(price).toFixed(2)});

    // generate a fileName
    const fileName = `ProductImages/${Date.now()}_${file.originalname}`;
    const productURL = await putObject(file,fileName);

    // if productURL fails
    if (!productURL) throw new Error("Image Upload failed");

    //create a new entry in db using s3 link
    await ProductImages.create({
        productId:product.productId,
        productURL
    })
    
    return Products.findByPk(product.productId,{
        include:[{
            model:ProductImages
        }]
    })
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