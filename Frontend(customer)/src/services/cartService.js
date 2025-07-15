// import required modules
import axios from "axios";

// declare as const as its won't change across requests
const API_BASE=`http://localhost:8000/api/customer`;

export async function addToCart(productId){
        const res = await axios.post(`${API_BASE}/add/${productId}`,{},{
            withCredentials:true
        });
        return res.data;
};