// import required modules 
const vendorProductServices = require('../../services/vendorServices/vendorProduct.service');
const v4 = require('uuid');

// get all  products(self-listed)
exports.getAllProducts = async(req,res)=>{
    try {
        // get vendorId from token
        const vendorId = req.user.id;
        console.log(vendorId);
        // passing data to service layer
        const productsList = await vendorProductServices.AllProducts(vendorId);
        
        // displaying all products
        res.status(200).json(productsList);
    } catch (error) {
        // if any error occurs
        res
          .status(500)
          .json({ message: error.message || "Something went wrong" });
    }
};

// add a new product
exports.newProduct = async(req,res) =>{
    try {
        // get vendorId from token
        const  vendorId = req.user.id;
        const file= req.files?.file;

        // if (!file) return res.status(400).json({error:'Image file is required'})
        // const fileName = 'images/'+ v4();

        // passing vendorId explicitly to the services
        const productData = {
            ...req.body,
            vendorId,
          
        };

        // pass the data to the service layer
        const product = await vendorProductServices.createProduct(productData);

        // if request successfully handled
        res.status(201).json({message:"Product created",product});
    } catch (error) {
        // if any error occurs
        res
          .status(500)
          .json({ message: error.message || "Something went wrong" });
    }
};

// update a product
exports.updateProduct = async (req,res)=>{
    try {
      // get productId from params
      const productId = req.params.productId;

      // pass data to the service layer
      const updatedProduct = await vendorProductServices.updateProduct(
        productId,
        req.body
      );

      // if request successfully handled
      res.status(200).json({ message: "Product updated!", updatedProduct });
    } catch (error) {
        // if any error occurs
        res
          .status(error.statusCode || 500)
          .json({ message: error.message || "Something went wrong" });
    }
};

// delete a product
exports.deleteProduct = async(req,res)=>{
    try {
      // get productId from the params
      const productId = req.params.productId;

      // send request to service layer
      const product = await vendorProductServices.deleteProduct(productId);

      // if request successfully handled
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        // if any error occurs
        res
          .status(error.statusCode || 500)
          .json({ message: error.message || "Something went wrong" });
    }
};