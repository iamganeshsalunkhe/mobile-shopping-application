// import required modules
const {Customers} = require('../../models');

exports.getProfileDetails = async(customerId)=>{
  // get data from controller level
  const customer = await Customers.findByPk(customerId);
  // as we allowing customer to fetch details only if while logged in hence no need handle "customer not found scenario"
  return customer;
};

