// import required modules
import { useQuery ,useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { useState } from "react";
import {toast} from 'react-hot-toast';

// fetch the products from the database
async function fetchProducts(){
    try {
        const res = await axios.get('http://localhost:8000/api/vendor/products',{
          withCredentials:true
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
}


function Products() {
  // state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // state for the updating the products
  const [selectedProduct,setSelectedProduct]= useState(false);

  const queryClient = useQueryClient();

    const {data:products=[],isLoading,isError}  = useQuery({queryKey:['products'],
        queryFn:fetchProducts
    });

    // to delete the product
    const deleteProduct = useMutation({
      mutationFn:async(product) =>{
        const isConfirmed = window.confirm(`Do you really want to delete ${product.productName}?`)
        if (isConfirmed){
        await axios.delete(`http://localhost:8000/api/vendor/prodct/${product.productId}`,{
          withCredentials:true
        }
        )
      }
      },
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['products']})
      },
      onError:(error)=>{
          const message = error.response?.data?.message || 'Failed to delete product!'
          toast.error(message)
      }
    },  
  )

  function openModal(product){
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  function closeModal(){
    setSelectedProduct(null)
    setIsModalOpen(false)
  }

    // show loader if data is not received yet
    if (isLoading) return <Loader/>

    // throw error if error occurs while fetching data
    if (isError) return <Error/>

    
    return (
      <div className="overflow-x-auto min-h-screen bg-gray-300">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="font-bold text-2xl font-sans ">
              <th>Sr no.</th>
              <th>Product Name</th>
              <th>Specification</th>
              <th>Product Price</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product, index) => (
              <tr key={product.productId}>
                <th className="font-semibold text-lg text-gray-900">{index +1 }</th>
                <td className="font-semibold text-lg text-gray-900">
                  {product.productName || 'NA'}
                </td>
                <td className="font-semibold text-lg text-gray-900">
                  {product.specification ||'NA'}
                </td>
                <td className="font-semibold text-lg text-gray-900">
                  {product.price || 'NA'}
                </td>
                <td>
                  <button
                        onClick={()=>openModal(product)}
                        className="font-bold bg-green-700 m-2 p-2 rounded-xl cursor-pointer  text-white">
                    Update
                  </button>
                  <button 
                      onClick={()=>deleteProduct.mutate(product)}
                      className="font-bold bg-red-700 m-2 p-2 rounded-xl cursor-pointer text-white">
                    Delete
                  </button> 
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Products
