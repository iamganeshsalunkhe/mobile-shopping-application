// import required module
import axios from 'axios';

const API_BASE = `http://localhost:8000/api/customer`;

export const getCurrentUser = async()=>{
    const res = await axios.get(`${API_BASE}/me`,{
        withCredentials:true
    });
    return res.data;
};