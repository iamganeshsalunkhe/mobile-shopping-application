// import required modules

import axios from "axios";

export const fetchProducts = async () => {
    // fetch all the products
 try {
     const { data } = await axios.get(
       "http://localhost:8000/api/customer/product"
     );
     return data;
 } catch (error) {
    // if any error occurs
    console.error(error);
    throw error;
 }
};