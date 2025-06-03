// import required modules
const {Customers} = require('../../models');
const { hashPassword } = require('../../utils/Password');



exports.registerCustomer = async(req)=>{
    // get required info from req
    const {email,fullName,password,contactNumber} = req.body;

    // check that if any customer exits with same email id
    const isExisting = await Customers.findOne({where:{email}});

    if (isExisting) {
        const error = new Error('Email already registered!');
        error.statusCode = 400;
        throw error;        
    }

    // if customer not exists then hash password
    const hashedPassword = await hashPassword(password);

    // now create a new entry in db;
    const newCustomer = await Customers.create({
        email,
        fullName,
        contactNumber,
        password:hashedPassword
    })
    return newCustomer;

} 