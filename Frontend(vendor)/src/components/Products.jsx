// import required modules
import { useQuery ,useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { useState } from "react";
import {toast} from 'react-hot-toast';
import {useForm} from 'react-hook-form';

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
  const [editProduct,setEditProduct]= useState(null);

  // to handle form
  const {register,handleSubmit, reset} = useForm();

  const queryClient = useQueryClient();

    const {data:products=[],isLoading,isError}  = useQuery({queryKey:['products'],
        queryFn:fetchProducts
    });

    // to delete the product
    const deleteProduct = useMutation({
      mutationFn:async(product) =>{
        const isConfirmed = window.confirm(`Do you really want to delete ${product.productName}?`)
        if (isConfirmed){
        await axios.delete(`http://localhost:8000/api/vendor/product/${product.productId}`,{
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
  //to open modal for creating new product
  function openCreateModal(){
    setEditProduct(null)
    setIsModalOpen(true)
  }

  // to open modal for updating an existing product
  function openUpdateModal(product){
    setEditProduct(product)
    setIsModalOpen(true)
  }

  // to close the modal
  function closeModal(){
    setIsModalOpen(false)
  };

  // function to add new product

  async function onSubmit(e){
  try {
    e.preventDefault();
    const newProduct = {
      productName: e.target.productName.value,
      specification: e.target.specification.value,
      price: e.target.price.value,
    };
    await axios.post(`http://localhost:8000/api/vendor/product`, newProduct, {
      withCredentials: true,
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    reset();
    closeModal();

  } catch (error) {
    console.error(error)
  }
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
            {products.map((product, index) => (
              <tr key={product.productId}>
                <th className="font-semibold text-lg text-gray-900">
                  {index + 1}
                </th>
                <td className="font-semibold text-lg text-gray-900">
                  {product.productName || "NA"}
                </td>
                <td className="font-semibold text-lg text-gray-900">
                  {product.specification || "NA"}
                </td>
                <td className="font-semibold text-lg text-gray-900">
                  {product.price || "NA"}
                </td>
                <td>
                  <button
                    onClick={() => openUpdateModal(product)}
                    className="font-bold bg-green-500 hover:bg-green-800 m-2 p-2 rounded-xl cursor-pointer  text-white"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProduct.mutate(product)}
                    className="font-bold bg-red-500 hover:bg-red-800 m-2 p-2 rounded-xl cursor-pointer text-white "
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="tooltip flex justify-center m-4 font-bold font-sans "
          data-tip="Add a new product "
        >
          <button
            onClick={openCreateModal}
            className="bg-blue-500 hover:bg-blue-700 transition text-white text-2xl m-4 p-2 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer
          "
            aria-label="add a new product"
          >
            {" "}
            +{" "}
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0  bg-opacity-10 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-auto shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-center">
                Add a new Product
              </h2>
              <form onSubmit={onSubmit}>
                <div className=" grid-cols-1">
                  <label for="productName" className="font-bold ">
                    Product Name :-{" "}
                  </label>
                  <input
                    {...register("productName")}
                    className="w-full mb-3 p-2 border rounded outline-sky-600 focus:outline-2 font-semibold "
                  />
                  <label for="productName" className="font-bold ">
                    Product Specifications:-
                  </label>

                  <input
                    {...register("specification")}
                    className="w-full mb-3 p-2 border rounded  outline-sky-600 focus:outline-2 font-semibold "
                  />
                  <label for="productName" className="font-bold  ">
                    Product Price :-
                  </label>

                  <input
                    {...register("price")}
                    type="number"
                    className="w-full mb-3 p-2 border rounded  outline-sky-600 focus:outline-2 font-semibold "
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="mr-2 px-4 py-2 bg-gray-600 rounded text-white font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded font-bold cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
}

export default Products
