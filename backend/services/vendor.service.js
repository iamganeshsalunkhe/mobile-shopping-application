// import required files 
const {Vendors} = require('../models');
const {hashPassword} = require('../utils/Password');


// signup/registering a new vendor

exports.registerVendor = async({email,password,vendorName,brandLogo})=>{
    // checks that if any vendor exists with same email
    const isExisting = await  Vendors.findOne({where:{email}});

    // if vendor exists then throw error
    if (isExisting) throw new Error('Email already registered');

    // if not then hash the password
    const hashedPassword = await hashPassword(password);
    // create a new entry in database
    return await Vendors.create({
        email,
        vendorName,
        password:hashedPassword,
        brandLogo,
    })
}
