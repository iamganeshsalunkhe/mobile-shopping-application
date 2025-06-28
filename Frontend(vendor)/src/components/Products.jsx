// import required modules
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { IoIosAddCircleOutline } from "react-icons/io";

// fetch the products from the database(self-listed)
async function fetchProducts() {
  try {
    const res = await axios.get("http://localhost:8000/api/vendor/product", {
      withCredentials: true,
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
  const [isEditProduct, setEditProduct] = useState(null);

  // to handle form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues:{
      productName:"",
      specification:"",
      price:"",
      productImage:null
    }
  });

  const queryClient = useQueryClient();

  //to open modal for creating new product
  function openCreateModal() {
    setEditProduct(null);
    setIsModalOpen(true);
    reset({
      productName: "",
      specification: "",
      price: "",
      productImage: null,
    });
  }

  // to open modal for updating an existing product
  function openUpdateModal(product) {
    setEditProduct(product);
    reset({
      productName: product.productName,
      specification: product.specification,
      price: product.price,
      productImage:product.ProductImages?.[0]?.imageUrl
    });
    setIsModalOpen(true);
  }

  // to close the modal
  function closeModal() {
    setIsModalOpen(false);
    reset();  
  }

  // fetch the product
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 60 * 1000, // 1 min = 60000ms (60 * 1000)
    cacheTime: 2 * 60 * 1000, // 2 min
    refetchInterval: 2 * 60 * 1000, // 2min
    refetchOnWindowFocus: true, // fetch if user changes tab and then comes back
  });

  // to delete the product
  const deleteProduct = useMutation({
    mutationFn: async (product) => {
      await axios.delete(
        `http://localhost:8000/api/vendor/product/${product.productId}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      toast.success("Product Deleted Successfully!!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Failed to delete product!";
        console.log(error);
      toast.error(message);
    },
  });

  // function to add new product
  async function onSubmit(data) {
    // create a formData 
    const formData = new FormData();

    try {
    
      const price = parseFloat(data.price).toFixed(2);

      formData.append('productName',data.productName);

      formData.append('specification',data.specification);

      formData.append('price', price);

      formData.append("productImage", data.productImage[0]);


      // if edit product is true (User want to delete a product)
      if (isEditProduct) {
        await axios.put(
          `http://localhost:8000/api/vendor/product/${isEditProduct.productId}`,
          formData,
          { withCredentials: true }
        );
        toast.success("Product updated successfully!");
      } else {
        // if edit product is false (User want to add a product)
        await axios.post(
          `http://localhost:8000/api/vendor/product`,
          formData,
          {
            withCredentials: true,
          }
        );
        toast.success("Product added successfully!");
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      reset();
      setEditProduct(null);
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  }

  // show loader if data is not received yet
  if (isLoading) return <Loader />;

  // throw error if error occurs while fetching data
  if (isError) return <Error />;
  
  return (
    <div className="overflow-x-auto min-h-screen bg-gray-200 border-2 select-none">
      {/* case 1: No products available */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            You haven't added any product yet.
          </h1>
          <button
            onClick={openCreateModal}
            className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:scale-110 transition cursor-pointer"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        // case 2 :products available
        // <div className="overflow-x-auto min-h-screen bg-gray-300  border-2">
        <>
          <table className="table w-full border-collapse border  border-gray-500">
            {/* head */}
            <thead>
              <tr className="font-bold text-2xl font-sans tracking-wide border-b-2">
                <th className="border-r border-gray-500 px-4 py-2">
                  Product Name
                </th>
                <th className="border-r border-gray-500 px-4 py-2">
                  Specification
                </th>
                <th className="border-r border-gray-500 px-4 py-2">
                  Product Price
                </th>
                <th className="border-r border-gray-500 px-4 py-2">
                  Product Image
                </th>
                <th className="border-r border-gray-500 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.productId}
                  className="bg-gray-100 hover:bg-gray-300 border-b"
                >
                  <td className="font-semibold text-lg text-gray-900 border-r border-gray-400">
                    {product.productName || "NA"}
                  </td>
                  <td className="font-semibold text-lg text-gray-900 border-r border-gray-400">
                    {product.specification || "NA"}
                  </td>
                  <td className="font-semibold text-lg text-gray-900 border-r border-gray-400">
                    {new Intl.NumberFormat('en-IN',{
                      style:'currency',
                      currency:'INR',
                      minimumFractionDigits:0,
                      maximumFractionDigits:0
                    }).format(product.price) || "NA"}
                  </td>
                  <td className="border-r border-gray-400 overflow-hidden rounded-lg group  h-48 ">
                    <img
                      src={
                        product.ProductImages?.[0]?.signedUrl}
                      alt={product.productName}
                      className="w-54 h-40 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                    />
                  </td>
                  <td className="px-2">
                    <button
                      onClick={() => openUpdateModal(product)}
                      className="font-bold bg-green-500 hover:bg-green-700 m-2 p-2 rounded-xl cursor-pointer  text-white hover:scale-120 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        const isConfirmed = window.confirm(
                          `Do really want to delete ${product.productName}`
                        );
                        if (isConfirmed) {
                          deleteProduct.mutate(product);
                        }
                      }}
                      className="font-bold bg-red-500 hover:bg-red-700 m-2 p-2 rounded-xl cursor-pointer text-white hover:scale-120 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="tooltip tooltip-bottom flex justify-center m-4 font-bold font-sans ">
            <button
              data-tip="Add a new product"
              onClick={openCreateModal}
              className="tooltip tooltip-bottom bg-blue-500 hover:bg-blue-600 transition text-white text-3xl m-8 p-2 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer hover:scale-110 select-none tooltip-black-text
          "
              aria-label="add a new product"
            >
              {" "}
              <IoIosAddCircleOutline />{" "}
            </button>
          </div>
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 min-w-screen bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-xl md:min-w-1/2 shadow-xl ">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isEditProduct ? "Update a Product" : "Add a new product"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                {/* input tag for the productName */}
                <label htmlFor="productName" className="font-bold ">
                  Product Name :-
                </label>
                <input
                  {...register("productName", {
                    required: "Product name is required",
                  })}
                  className="w-full mb-1 p-2 border rounded outline-sky-600 focus:outline-2 font-semibold "
                />
                {errors.productName && (
                  <span className="text-red-500 font-semibold block">
                    {errors.productName.message}
                  </span>
                )}
              </div>

              {/* input tag for specification of the product */}
              <div>
                <label htmlFor="specification" className="font-bold ">
                  Product Specifications:-
                </label>

                <input
                  {...register("specification", {
                    required: "Specification are required!",
                  })}
                  className="w-full mb-1 p-2 border rounded  outline-sky-600 focus:outline-2 font-semibold "
                />
                {errors.specification && (
                  <span className="text-red-500 font-semibold">
                    {errors.specification.message}
                  </span>
                )}
              </div>

              {/* input tag for  price of the product */}
              <div>
                <label htmlFor="price" className="font-bold  ">
                  Product Price :-
                </label>

                <input
                  {...register("price", { required: "Price is required!" })}
                  type="number"
                  className="w-full mb-1 p-2 border rounded  outline-sky-600 focus:outline-2 font-semibold "
                />
                {errors.price && (
                  <span className="text-red-500 font-semibold">
                    {errors.price.message}
                  </span>
                )}
              </div>

              {/* input for product image */}
              <div>
                <label htmlFor="productImage" className="font-bold  ">
                  Product image :-
                </label>

                <input
                  {...register("productImage")}
                  type="file"
                  className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-800 cursor-pointer"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 px-4 py-2 bg-gray-500 rounded text-white font-semibold cursor-pointer hover:scale-110 hover:bg-gray-700 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded font-bold cursor-pointer hover:scale-110 hover:bg-blue-800 transition duration-300"
                >
                  {isEditProduct ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
