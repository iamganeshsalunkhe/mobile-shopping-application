// import required modules
const {Products,ProductImages} = require('../../models');
const { deleteObject } = require('../../utils/deleteObject');
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
    const imageKey = `ProductImages/${Date.now()}_${file.originalname}`;
    const uploadedKey = await putObject(file,imageKey);

    // if productURL fails
    if (!uploadedKey) throw new Error("Image Upload failed");

    //create a new entry in db using s3 link
    await ProductImages.create({
        productId:product.productId,
        imageUrl:uploadedKey
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

  // search in productImage table with same productId
  const productImageData = await ProductImages.findOne({ where: { productId } });

  // If image is not uploaded by user
   if (!productImageData) return await productToDelete.destroy();


  // get URL from productImageData
  const s3ImageKey = productImageData.imageUrl;
  
  if (!productToDelete) {
      const error = new Error("Product not found!!");
      error.statusCode = 404;
      throw error;
    }
  await deleteObject(s3ImageKey);
    
  //delete the product
  return await productToDelete.destroy();
};