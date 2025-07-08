// import required module
const {Products,ProductImages} = require('../../models');
const {getSignedS3URL} = require('../../utils/getSignedS3URL');

// get all products (irrespective of vendor to showcase on FE)
exports.allProducts = async()=>{
    // get all products from the data base
    const products = await Products.findAll({
        include:[
            {
                model:ProductImages,
                attributes:['imageUrl']
            }
        ]
    });

    await Promise.all(products.map(async(product)=>{
        product.ProductImages = await Promise.all(
            product.ProductImages.map(async(image)=>{

                // get signedURL 
                const signedURL = await getSignedS3URL(image.imageUrl);
                image.dataValues.signedURL = signedURL;
            })
        )
    })
);

    return products;
}

//get specific product using productId
exports.getSpecificProduct = async(productId) =>{
    // get productId from the controller layer
    const product = await Products.findByPk(productId);

    // return the product
    return product;
};