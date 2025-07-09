import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";

const fetchProduct = async (productId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:8000/api/customer/product/${productId}`
    );
    return data;
  } catch (error) {
    // if any error occurs
    console.error(error);
  }
};

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 1000 * 60 * 1, // 3 minutes
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12 min-h-screen">
        <p className="text-red-500 text-lg">Something went wrong!</p>
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 cursor-pointer select-none"
      >
        <FiArrowLeft className="mr-2" /> Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden select-none">
          <img
            src={product.signedProductURL}
            alt={product.productName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Product Info */}
        <div className="select-none">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 capitalize">
            {product.productName}
          </h1>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(product.price)}
            </span>
          </div>

          <div className="mb-6">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={1}
              readOnly
              className="w-16 text-center border-t border-b border-gray-300 py-1"
            />
          </div>

          <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2 cursor-pointer">
            <FiShoppingCart /> Add to Cart
          </button>

          {/* Enhanced Product Details Section */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Product Details
            </h2>

            <div className="bg-gray-50 rounded-lg p-5">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Specifications:
                  </span>
                  <span className="text-gray-800">{product.specification}</span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Category:
                  </span>
                  <span className="text-gray-800">Mobile</span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Brand:
                  </span>
                  <span className="text-gray-800">
                    {product?.Vendor?.vendorName || "N/A"}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="w-32 flex-shrink-0 font-medium text-gray-600">
                    Availability:
                  </span>
                  <span
                    className={`font-medium ${
                      product.soldOut === false
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.soldOut === false ? "In Stock" : "Out of Stock"}
                  </span>
                </li>
              </ul>
            </div>

            {/* Brand Logo Section */}
            {product.signedBrandLogoURL && (
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center space-x-4">
                <span className="text-gray-600">Sold by</span>
                <div className="p-2 bg-white rounded-md border border-gray-200">
                  <img
                    src={product.signedBrandLogoURL}
                    alt="Brand Logo"
                    className="h-20 object-contain"
                      onError={(e) => {
                        e.target.parentElement.parentElement.style.display = "none";
                      }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
