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

export async function getCartInfo(){
    // get method takes only two arguments
    const res = await axios.get(`${API_BASE}/cart`,{
        withCredentials:true
    });
    return res.data;
};

export async function deleteCartProducts(productId){
    // delete can take 3 arguments but that optional
    const res = await axios.delete(`${API_BASE}/remove/${productId}`,{
        withCredentials:true
    });

    return res.data;
};