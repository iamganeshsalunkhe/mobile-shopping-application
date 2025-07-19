//  import required modules

import axios from "axios";
const API_BASE = `http://localhost:8000/api/customer`;

// fetch customer Data
export async function fetchCustomerData() {
  try {
    // get the data of the customer
    const res = await axios.get(`${API_BASE}/account`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
}

//function for updating an account info
export async function updateCustomerData(formData) {
  try {
    const res = await axios.put(`${API_BASE}/account`, formData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
}

// function for deleting the customer Account
export async function deleteCustomerAccount() {
  try {
    const res = await axios.delete(`${API_BASE}/account`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
};
