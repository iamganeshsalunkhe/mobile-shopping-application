// import required modules 
const vendorProductServices = require('../../services/vendorServices/vendorProduct.service');

// add a new product
exports.newProduct = async(req,res) =>{
    try {
        // get vendorId from token
        const  vendorId = req.user.id;

        // passing vendorId explicitly to the services
        const productData = {
            ...req.body,vendorId
        };

        const product = await vendorProductServices.createProduct(productData);

        res.status(201).json({message:"Product created",product});
    } catch (error) {
        // if any error occurs
        res.status(500).json({message:error.message});
    }
};

// update a product
exports.updateProduct = async (req,res)=>{
    try {
        // get productId from params
        const productId = req.params.productId;
    
        const updatedProduct  = await vendorProductServices.updateProduct(productId,req.body);

        res.status(200).json({message:"Product updated!", updatedProduct});

    } catch (error) {
        // if any error occurs
        res.status(error.statusCode).json({message:error.message});
    }
}