// import required modules
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

// fetch the products from the database
async function fetchProducts(){
    try {
        const res = await axios.get('http://localhost:8000/api/vendor/products',{
          withCredentials:true
        });
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error(error);
    }
}


function Products() {
    const {data:products=[],isLoading,isError}  = useQuery({queryKey:['products'],
        queryFn:fetchProducts
    });

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
              <tr key={product.id}>
                <th className="font-semibold text-lg text-gray-900">{index + 1}</th>
                <td className="font-semibold text-lg text-gray-900">
                  {product.productName}
                </td>
                <td className="font-semibold text-lg text-gray-900">
                  {product.specification}
                </td>
                <td className="font-semibold text-lg text-gray-900">
                  {product.price}
                </td>
                <div className="">
                  <button className="font-bold bg-green-400 m-2 p-2 rounded-xl cursor-pointer ">
                    Update
                  </button>
                  <button className="font-bold bg-red-400 m-2 p-2 rounded-xl cursor-pointer">
                    Delete
                  </button>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Products
