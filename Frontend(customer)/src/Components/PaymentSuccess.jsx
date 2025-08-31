import { useState } from "react";
import {
  CheckCircleIcon,
  XMarkIcon,
  ShoppingBagIcon,
  ReceiptPercentIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const PaymentSuccess = ({ show=true}) => {

  const {state} = useLocation();
  console.log(state)
  const {orderId,amount,paymentId,customerName,customerPhone,customerEmail} = state || {};


  const [isVisible] = useState(true);


  if (!show && !isVisible) return null;

  return (
    <div
      className={`inset-0 bg-stone-100 bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }min-w-screen min-h-screen  md:w-auto`}
    >
      <div
        className={`bg-zinc-300 rounded-2xl shadow-xl overflow-hidden max-w-lg w-full transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-green-300 to-teal-300 p-1">
          <div className="bg-green-100 rounded-xl rounded-b-none p-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping"></div>
                <CheckCircleIcon className="w-20 h-20 text-green-600 relative z-10" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Payment Successful!
              </h2>
              <p className="text-gray-600 font-semibold">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </div>
          </div>
        </div>

        <div className="p-auto">
          <div className="bg-green-50  p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <ReceiptPercentIcon className="w-5 h-5 mr-2 text-green-600" />
              Order Details
            </h3>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Order Number :
                </p>
                <p className="font-semibold">{orderId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Customer Email :
                </p>
                <p className="font-semibold">
                  {customerEmail || "ganusalunkhe1998@gmail.com"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Amount Paid:
                </p>
                <p className="font-semibold">{new Intl.NumberFormat("en-IN",{
                  style:"currency",
                  currency:"INR",
                  minimumFractionDigits:0,
                  maximumFractionDigits:0
                }).format(amount)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Payment Id :
                </p>
                <p className="font-semibold">{paymentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Customer Name :
                </p>
                <p className="font-semibold">{customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">
                  Customer Contact Details :
                </p>
                <p className="font-medium">{customerPhone}</p>
              </div>
            </div>
          </div>

          <div className=" p-4  flex flex-col sm:flex-row gap-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-1 flex-1 cursor-pointer"
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Continue Shopping
            </Link>
            <Link
              to="orders"
              className="bg-emerald-400 border border-gray-300 text-black py-3 px-6 rounded-xl font-medium flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 flex-1 cursor-pointer hover:-translate-y-1 "
            >
              <ReceiptPercentIcon className="w-5 h-5 mr-2" />
              View Order
            </Link>
          </div>
        </div>

        <Link to="/products" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-300 cursor-pointer">
          <XMarkIcon className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
