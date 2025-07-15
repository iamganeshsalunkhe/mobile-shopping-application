    import { Link } from "react-router-dom";
    import {
    FiShoppingBag,
    FiTrash2,
    FiArrowLeft
    } from "react-icons/fi";

    const CartPage = ({ removeFromCart }) => {
    

    const subtotal = cartItems.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shippingFee = subtotal > 500 ? 0 : 50;
    const total = subtotal + shippingFee;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
            <Link
            to="/products"
            className="text-gray-600 hover:text-blue-600 transition"
            >
            <FiArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
            <div className="w-6" />
        </header>

        {/* Empty State */}
        {cartItems.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
            <FiShoppingBag size={50} className="text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-2">Your cart is empty</p>
            <Link
                to="/products"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition"
            >
                Browse Mobiles
            </Link>
            </div>
        ) : (
            <>
            {/* Cart Items */}
            <div className="space-y-6 mb-10">
                {cartItems.items.map((item) => (
                <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm p-4 md:p-6 flex items-center gap-4 hover:shadow-md transition"
                >
                    <img
                    src={item.signedProductURL || item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-lg border"
                    />
                    <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                        </h3>
                        <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                        >
                        <FiTrash2 size={18} />
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        {item.Vendor?.vendorName || item.brand}
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
                        Qty: {item.quantity}
                        </span>
                        <p className="font-semibold text-gray-800 text-lg">
                        ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                    </div>
                    </div>
                </div>
                ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order Summary
                </h2>
                <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingFee === 0 ? "Free" : `₹${shippingFee}`}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                </div>
                </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition">
                Proceed to Checkout
            </button>
            </>
        )}
        </div>
    );
    };

    export default CartPage;

