// import required files 
const {Vendors} = require('../../models');
const {hashPassword, comparePassword} = require('../../utils/Password');
const jwt= require('jsonwebtoken');
const generateAuthToken = require('../../utils/Tokengeneration');


// signup/registering a new vendor

exports.registerVendor = async({email,password,vendorName,brandLogo})=>{
    // checks that if any vendor exists with same email
    const isExisting = await Vendors.findOne({ where: { email } });

    // if vendor exists then throw error
    if (isExisting){
        const error = new Error('Email already registered')
        error.statusCode = 400;
        throw error;
    }

    // if not then hash the password
    const hashedPassword = await hashPassword(password);

    // create a new entry in database
    const newVendor =  await Vendors.create({
      email,
      vendorName,
      password: hashedPassword,
      brandLogo,
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

    // assign a token to vendor with role
    // const token = jwt.sign({
    //   id:vendor.vendorId,role:'vendor'},
    //   process.env.JWT_SECRET,
    //   {expiresIn:'1h'}
    //   );
      const token = generateAuthToken(vendor);
        

      // set cookie 
      

      // get only necessary data from sequelize
      const plainVendor = vendor.toJSON();

      // combine vendor and token together
      const LoggedVendor = {...plainVendor,token}
      
  return {LoggedVendor};
};