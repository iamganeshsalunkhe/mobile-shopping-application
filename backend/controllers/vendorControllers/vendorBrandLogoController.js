// import  the required modules
const vendorBrandLogoServices = require("../../services/vendorServices/vendorBrandLogoService");

exports.addNewBrandLogo = async (req, res) => {
  try {
    // get vendorId from the jwt
    const vendorId = req.user.id;

    const file = req.file;

    // pass the data to the service layer

    const brandLogo = await vendorBrandLogoServices.AddBrandLogo(
      vendorId,
      file
    );

    // if request handled successfully
    req.status(200).json({ message: "Image uploaded successfully!" });
  } catch (error) {
    // if any error occurs
    console.error(error);
    req.status(500).json({ error: error.message });
  }
};
