// import required modules

import axios from "axios";

const API_BASE = `http://localhost:8000/api/customer`;

// function for get all addresses
export async function getAddresses() {
    try {
        // fetch the all addresses from BE
        const res = await axios.get(`${API_BASE}/address`,{
            withCredentials:true
        });
        return res.data;
    } catch (error) {
        // if any error occurs
        console.error("Error while fetching addresses :",error.response?.data?.message);
        throw error;
    }
};

export async function addAnNewAddress(data){
    try {
        // create a post request to BE
        const res = await axios.post(`${API_BASE}/address`,data,{
            withCredentials:true
        });
        // return the data
        return res.data;
    } catch (error) {
        // if any error occurs
        console.error("Error while adding an address:",error.response?.data?.message);
        throw error;
    }
};