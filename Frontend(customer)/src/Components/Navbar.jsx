// import required modules
import axios from "axios";
import { useState } from "react";
import {
  FiSearch,
  FiHome,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import toast from "react-hot-toast";
import { useCartStore } from "../stores/cartStore";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // state for search input
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // state for mobile devices
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // state for dropdown menu
  const queryClient = useQueryClient(); // extract queryclient
  const navigate = useNavigate(); // extract navigate hook
  const location = useLocation(); // extract location hook

  // get length products in the cart
  const cartLength = useCartStore(state=>state.getLengthOfCart());
  // condition for showing search bar
  const showSearchBar =
    location.pathname === "/" || location.pathname === "/products";

  // get check user is authenticated for not
  const authData = JSON.parse(localStorage.getItem("authSession")); // have to parse as using zustand(zustand store it as object not as plain text)
  const isAuthenticated = authData?.state?.isAuthenticated === true;

  
  // function for handling search
  function handleSearch(e) {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  }

  // function for handling logout and other navigation
  async function handleClickOnLogout(item) {
    // first close the dropdown menu options
    setIsDropdownOpen(false);

    // if item contains action then
    if (item.action) {
      try {
        // make request to backend for logout
        await axios.post(
          "http://localhost:8000/api/customer/logout",
          {},
          { withCredentials: true }
        );

        navigate("/login",{state:{fromLogout:true}}); // navigate to home page
        queryClient.clear(); // clear all cached data
        useCartStore.getState().clearCart(); // clear all carts value
        useAuthStore.getState().logout(); // set isAuthentication to false(in localStorage)
        toast.success("Logged Out Successfully!"); // give success message
      } catch (error) {
        // if any error occurs
        console.error(error);
        toast.error(error.response?.data?.message);
      }
      // item does not contain any action method then its a navigation route
    } else {
      // handle regular navigation
      navigate(item.path);
    }
  }

  const navItems = [
    { name: "Home", path: "/", icon: <FiHome className="text-lg" /> },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
  ];

  const dropdownItems = [
    { name: "Account", path: "/account" },
    { name: "Orders", path: "/orders" },
    { name: "Addresses", path: "/address" },
    { name: "Logout", path: null, action: true },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Logo and desktop nav */}
          <div className="flex items-center ">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center select-none"
            >
              <span className="text-xl font-bold text-indigo-600">MSA</span>
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 select-none">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className=" md:flex flex-1 max-w-md mx-4 select-none items-center">
            {showSearchBar && (
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative ">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2"
                  />
                </div>
              </form>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-4 select-none">
            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 relative"
            >
              <FiShoppingCart className="h-6 w-6" />
             {isAuthenticated && cartLength > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartLength}</span>)}
            </Link>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              {
               isAuthenticated ? (
                 <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      <FiUser className="h-5 w-5" />
                    </div>
                  </button>
                </div>
               ) : (
                <button
                onClick={()=>navigate('/login')}
                className="bg-blue-500 px-3 py-2 hover:bg-blue-700 transition cursor-pointer rounded-xl text-white ">Login</button>
               )
              }

              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer">
                  {dropdownItems.map((item) => (
                    <div
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleClickOnLogout(item)}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
