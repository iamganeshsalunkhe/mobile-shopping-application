// import required modules

import axios from "axios";

const API_BASE = `http://localhost:8000/api/customer`;

export async function createOrder(){
    try {
        // make post request to BE to create razorpay_order_id
        const res = await axios.post(`${API_BASE}/createOrder`,{},{
            withCredentials:true
        }
        );
        return res.data;     
           
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
}