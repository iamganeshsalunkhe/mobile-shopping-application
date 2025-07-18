// import required modules
import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";


export default function AddressPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  function handleEditAddress () {
    setShowForm(true);
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/account"
          className="text-gray-600 hover:text-blue-600 transition flex items-center"
        >
          <FiChevronLeft size={20} className="mr-1" />
          Back
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">My Addresses</h1>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      {/* Add Address Button */}
      <button
        className="flex items-center justify-center w-full md:w-auto mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <FiPlus className="mr-2" />
        Add New Address
      </button>

      {/* Address Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Address" : "Add New Address"}
            </h2>

            <form >
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <textarea
                    name="address"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="defaultAddress"
                    name="isDefault"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="defaultAddress"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Set as default address
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  {isEditing ? "Update Address" : "Save Address"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-4">
            You haven't saved any addresses yet.
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`bg-white rounded-xl shadow-sm p-6 border-2 ${
                address.isDefault ? "border-blue-500" : "border-transparent"
              } hover:shadow-md transition`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">
                  {address.name}
                  {address.isDefault && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Default
                    </span>
                  )}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-gray-500 hover:text-blue-600 transition"
                    aria-label="Edit address"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-600 transition"
                    aria-label="Delete address"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="text-gray-600 space-y-2">
                <p>{address.address}</p>
                <p>
                  {address.city}, {address.state} - {address.pincode}
                </p>
                <p>Phone: {address.phone}</p>
              </div>

              {!address.isDefault && (
                <button
                  className="mt-4 text-sm text-blue-600 hover:text-blue-800 transition"
                >
                  Set as default
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
