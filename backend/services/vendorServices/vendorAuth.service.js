// import required files 
const {Vendors} = require('../../models');
const {hashPassword, comparePassword} = require('../../utils/Password');
const generateAuthToken = require('../../utils/Tokengeneration');
const  {putObject} =require('../../utils/putObject');

// signup/registering a new vendor

exports.registerVendor = async(req)=>{

    const {vendorName,email,password} = req.body;
    const file = req.file;

    if (!file) throw new Error ("Brand-Logo required !");


    // checks that if any vendor exists with same email
    const isExisting = await Vendors.findOne({ where: { email } });

    // if vendor exists then throw error
    if (isExisting){
        const error = new Error('Email Already Registered !')
        error.statusCode = 400;
        throw error;
    }

    // if not then hash the password
    const hashedPassword = await hashPassword(password);

    // upload brand logo to s3
    const fileName = `brand-logo/${Date.now()}_${file.originalname}`;
    const logoUrl = await putObject(file,fileName);
    
    // logoUrl fails
    if (!logoUrl){
        throw new Error("Image Upload Failed!")
    }

    // create a new entry in database with s3 url
    const newVendor =  await Vendors.create({
      email,
      vendorName,
      password: hashedPassword,
      brandLogo:logoUrl,
    });
    return newVendor;
  };

// logging in a vendor
exports.loginVendor = async({email,password})=>{
      // check the vendor exists in database using email
      const vendor = await Vendors.findOne({ where: { email } });

      // if vendor not found then
      if (!vendor){
        const error = new Error(`You don't have an account with us or email is incorrect!!`);
        error.statusCode = 404;
        throw error;
      }
    
      // if vendor found but admin not given approved yet
      if (vendor.isAccepted !== "Accepted"){
        const error = new Error("Vendor account not approved yet");
        error.statusCode = 403;
        throw error;
      }

      // if vendor found and admin approved request
      // check for right password
      const checkPassword = await comparePassword(password, vendor.password);

      // if password is wrong
      if (!checkPassword){
        const error = new Error('Invalid password');
        error.statusCode = 401;
        throw error;
    }

    
      const token = generateAuthToken(vendor);
        

      // set cookie 
      

      // get only necessary data from sequelize
      const plainVendor = vendor.toJSON();

      // combine vendor and token together
      const LoggedVendor = {...plainVendor,token}
      
  return {LoggedVendor};
};