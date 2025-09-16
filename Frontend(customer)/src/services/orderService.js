// import required modules
import axios from "axios";

// declare as const as its won't change across requests
const API_BASE = `http://localhost:8000/api/customer`;


export async function getOrders(){
    try {
        const {data} = await axios.get(`${API_BASE}/order`,{withCredentials:true});
    
        console.log(data);
        return data;

    } catch (error) {
        // if any error occurs
        console.log(error);
    }
}