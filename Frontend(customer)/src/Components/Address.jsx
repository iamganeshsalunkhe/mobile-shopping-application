import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiEdit2, FiTrash2, FiChevronLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Error from "./Error";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {addAnNewAddress, deleteAnAddress, getAddresses} from "../services/addressService";
import toast from "react-hot-toast";

export default function Address() {
    // get navigate hook for navigation
    const navigate = useNavigate();
    // state for modal open/close
    const [isModalOpen, setIsModalOpen] = useState(false);

    // state for is address is updating or not
    const [editingAddressId, setEditingAddressId] = useState(null);

    // get queryClient
    const queryClient = useQueryClient();

  // Form handling
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting},
  } = useForm({
    defaultValues: {
      fullName: "",
      contactNumber: "",
      addressLine: "",
      landMark: "",
      city: "",
      district: "",
      state: "",
      postalCode: "",
      country: "India",
      addressType: "Shipping",
      isDefault: false,
    },
  });

  //fetch all addresses
  const {
    data: addresses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey:["addresses"],
    queryFn: getAddresses,
    onError: () => toast.error("Failed to load addresses"),
  });

  // add an addressMutation
  const addAddressMutation = useMutation({
    mutationFn:addAnNewAddress,
    onSuccess:()=>{
      queryClient.invalidateQueries(['addresses']);
      toast.success("Address Added Successfully!");
      setIsModalOpen(false);
    },
    onError:(error)=>{
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  });

  // delete an addressMutation
  const deleteAddressMutation = useMutation({
    mutationFn:(addressId)=>deleteAnAddress(addressId),
    onSuccess:()=>{
      queryClient.invalidateQueries(['addresses']);
      toast.success("Address Deleted Successfully!");
    },
    onError:(error)=>{
      console.error(error);
      toast.error(error.response?.data?.message);
    }
  })

 function onSubmit(data){
  if (!editingAddressId){
    addAddressMutation.mutate(data);
  }
}

  // function for deleting address
  function handleDeleteAddress(addressId){
    try {
      const confirmDelete = window.confirm(`Do you really want delete this address?`);

      // if confirmDelete is true
      if (confirmDelete) deleteAddressMutation.mutate(addressId);
      return;
    } catch (error) {
      // if any error occurs
      console.error(error);
    }
  }

  // Form handlers
    function openAddModal  () {
    setEditingAddressId(null);
    reset({
      fullName: "",
      contactNumber: "",
      addressLine: "",
      landMark: "",
      city: "",
      district: "",
      state: "",
      postalCode: "",
      country: "India",
      addressType: "Shipping",
      isDefault: false,
    });
    setIsModalOpen(true);
  };

  function handleEditAddress  (address) {
    setEditingAddressId(address.addressId);
    reset({
      ...address,
      // check if isDefault is true otherwise set to false
      isDefault: address.isDefault || false,
    });
    setIsModalOpen(true);
  };

    // function for if user don't want add or update 
  function handleCancel ()  {
    setIsModalOpen(false);
    reset();
  };

  // if data is loading
  if (isLoading) return <Loader />;

  // if error occurs while fetching data
  if (isError) return <Error />;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-blue-600 transition flex items-center cursor-pointer"
        >
          <FiChevronLeft size={20} className="mr-1" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800">My Addresses</h1>
        <div className="w-6" />
      </div>

      {/* Add Address Button */}
      <button
        onClick={openAddModal}
        className="flex items-center justify-center w-full md:w-auto mb-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        <FiPlus className="mr-2" />
        Add An New Address
      </button>

      {/* Address Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl max-h-[90vh] overflow-hidden">
            {/* Sticky & Centered Header */}
            <div className="px-6 pt-6 pb-4 border-b text-center sticky top-0 bg-indigo-500 z-10 text-white">
              <h2 className="text-xl font-bold">
                {editingAddressId ? "Edit an Address" : "Add an New Address"}
              </h2>
            </div>

            {/* Scrollable form area */}
            <div className="overflow-y-auto max-h-[calc(90vh-48px)]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                  {/* Column 1 */}
                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        {...register("fullName", {
                          required: "Full name is required!",
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.fullName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Contact Number*
                      </label>
                      <input
                        type="tel"
                        {...register("contactNumber", {
                          required: "Contact number is required!",
                          pattern: {
                            value: /^[0-9]{10}$/, // validate only number and 10 digits
                            message: "Invalid Phone number!",
                          },
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.contactNumber
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                      />
                      {errors.contactNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.contactNumber.message}
                        </p>
                      )}
                    </div>

                    {/* Address Line */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Address Line*
                      </label>
                      <input
                        type="text"
                        {...register("addressLine", {
                          required: "Address is required!",
                        })}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                          errors.addressLine
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300 focus:ring-blue-500"
                        }`}
                      />
                      {errors.addressLine && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.addressLine.message}
                        </p>
                      )}
                    </div>

                    {/* Landmark */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Landmark*
                      </label>
                      <input
                        type="text"
                        {...register("landMark", {
                          required: "Landmark is required!",
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Column 2 */}
                  <div className="space-y-4">
                    {/* City / District */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          {...register("city", {
                            required: "City is required!",
                          })}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.city
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          }`}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.city.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          District*
                        </label>
                        <input
                          type="text"
                          {...register("district", {
                            required: "District is required!",
                          })}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.district
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          }`}
                        />
                        {errors.district && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.district.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* State / Postal Code */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          State*
                        </label>
                        <input
                          type="text"
                          {...register("state", {
                            required: "State is required!",
                          })}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.state
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          }`}
                        />
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.state.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">
                          Postal Code*
                        </label>
                        <input
                          type="text"
                          {...register("postalCode", {
                            required: "Postal code is required!",
                            pattern: {
                              value: /^[0-9]{6}$/, // validate pincode and 6 digits only
                              message: "Invalid Postal Code!",
                            },
                          })}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                            errors.postalCode
                              ? "border-red-500 focus:ring-red-500"
                              : "border-gray-300 focus:ring-blue-500"
                          }`}
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.postalCode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Address Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Address Type*
                      </label>
                      <select
                        {...register("addressType", { required: true })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Shipping">Shipping</option>
                        <option value="Billing">Billing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Default Checkbox */}
                    <div className="flex items-center pt-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        {...register("isDefault")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label
                        htmlFor="isDefault"
                        className="ml-2 text-sm text-gray-700 font-semibold cursor-pointer"
                      >
                        Set as default address
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex justify-center space-x-3 mt-4 px-6 pb-6 select-none">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-200  transition disabled:opacity-50 cursor-pointer hover:scale-105 duration-300  "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 cursor-pointer hover:scale-105 duration-300"
                  >
                    {isSubmitting
                      ? "Processing..."
                      : editingAddressId
                      ? "Update Address"
                      : "Save Address"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">
            You haven't saved any addresses yet.
          </p>
          <button
            onClick={openAddModal}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Address
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {addresses.map((address) => (
            <div
              key={address.addressId}
              className={`bg-white rounded-xl shadow-sm p-6 border-2 ${
                address.isDefault ? "border-blue-500" : "border-transparent"
              } hover:shadow-xl transition`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-lg">
                  {address.fullName}
                  {address.isDefault && (
                    <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      Default
                    </span>
                  )}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAddress(address)}
                    className="text-gray-500 hover:text-blue-600 transition cursor-pointer hover:scale-110"
                    aria-label="Edit address"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                  onClick={()=>handleDeleteAddress(address.addressId)}
                    className="text-gray-500 hover:text-red-600 transition cursor-pointer hover:scale-110"
                    aria-label="Delete address"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              </div>

              <div className="text-gray-600 space-y-2">
                <p>{address.addressLine}</p>
                <p>Landmark: {address.landMark}</p>
                <p className="capitalize">
                  City: {address.city},District: {address.district},{" "}
                  {address.state} - {address.postalCode}
                </p>
                <p>Mobile no: {address.contactNumber}</p>
                <p className="text-sm text-gray-500">
                  Type: {address.addressType}
                </p>
              </div>

              {!address.isDefault && (
                <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 transition cursor-pointer">
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
