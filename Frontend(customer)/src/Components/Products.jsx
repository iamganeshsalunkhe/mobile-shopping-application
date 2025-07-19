import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchProducts } from "../services/productService";
import Loader from "./Loader";
import Error from "./Error";


function Products () {
  // destructure using useQuery
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 3, // 3 minutes
  });


  // if data is still loading
  if (isLoading) return <Loader/>

  // if some error comes then 
  if (isError) return <Error/>

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center text-center gap-4 select-none">
        <h1 className="text-3xl font-bold text-gray-800 ">Our Products</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Product Image */}
            <Link
              key={product.productId}
              to={`/products/${product.productId}`}
              className="group relative bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center p-4 select-none">
                <img
                  src={product.ProductImages?.[0]?.signedURL}
                  alt={product.productName}
                  className="h-full object-contain cursor-pointer hover:scale-125 transition duration-300 "
                  loading="lazy"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="p-4">
              {/* Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                {product.productName}
              </h3>

              {/* Specs */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-1 ">
                {product.specification}
              </p>

              {/* Price */}
              <div className="select-none">
                <div className="flex justify-between items-center select-none">
                  <span className="text-lg font-bold text-blue-600 ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </span>
                  <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4  mt-2 sm:mt-0 sm:ml-auto">
                    <Link
                      key={product.productId}
                      to={`/products/${product.productId}`}
                      className=" hidden sm:inline-block text-sm bg-blue-600  hover:bg-blue-700 text-white px-3 py-1.5 rounded  hover:scale-110 transition-colors duration-300 cursor-pointer select-none text-center sm:text-left"
                    >
                      View Details
                    </Link>

                    {/* button for adding product to the cart */}
                    {/* <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded  hover:scale-110 transition duration-300 cursor-pointer select-none">
                      Add to Cart
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No products found matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
