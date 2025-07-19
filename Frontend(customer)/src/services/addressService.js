// import required modules

import axios from "axios";

const API_BASE = `http://localhost:8000/api/customer`;

// function for adding a new address
export async function getAddresses() {
    try {
        const res = await axios.get(`${API_BASE}/address`,{
            withCredentials:true
        });
        return res.data;
    } catch (error) {
        // if any error occurs
        console.error("Error while fetching addresses :",error);
        throw error;
    }
}