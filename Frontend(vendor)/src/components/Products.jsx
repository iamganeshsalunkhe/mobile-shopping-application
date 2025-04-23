// import required modules
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";

async function fetchProducts(){
    try {
        const res = await axios.get('https://localhost:8000/api/vednor/products');
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

function Products() {

    const {data:products=[],isLoading,isError}  = useQuery({queryKey:['products'],
        queryFn:fetchProducts
    });


    if (isLoading) return <Loader/>
    if (isError) return <Error/>

    return (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Specification</th>
              <th>Product Price</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products.map((product, index) => (
              <tr key={product.id}>
                <th>{index + 1}</th>
                <td>{product.customerName}</td>
                <td>{product.productName}</td>
                <td>{product.specification}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}

export default Products
