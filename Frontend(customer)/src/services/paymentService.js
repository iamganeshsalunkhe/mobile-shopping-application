// import required modules

import axios from "axios";

const API_BASE = `http://localhost:8000/api/customer`;

// request to BE for creating an order
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
};

// request to BE for verifying payment
export async function verifyPayment(paymentData){
    try {
        // make a post request to verify payment
        const res = await axios.post(`${API_BASE}/verifyPayment`,{paymentData},{withCredentials:true});
        return res.data;
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
};