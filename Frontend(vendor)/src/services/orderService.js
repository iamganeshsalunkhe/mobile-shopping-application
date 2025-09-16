// import required modules
import axios from 'axios';

export async function getVendorOrders(){
    try {
        const {data} = await axios.get("http://localhost:8000/api/vendor/orders", {
          withCredentials: true,
        });

        console.log(data);
        return data;
    } catch (error) {
        // if any error occurs
        console.error(error);
    }
}