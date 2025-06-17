// import required modules
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

export default function SingUp() {
  // get navigation from react-router-dom
  const navigate = useNavigate();

  // to handle form effectively
  const { register, handleSubmit } = useForm();

  // handle password visibility
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // function for toggle password visibility

  function handlePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  async function onSubmit(data) {
    try {
      // get the data from input fields
      const res = await axios.post(
        "http://localhost:8000/api/customer/signup",
        data,{
        headers:{"Content-Type":'application/json'},
        withCredentials:true
        }
      );
      if (res.data) {
        toast.success("Signed Up successfully!");
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        console.error(error);
        toast.error(error.response?.data?.message);
      }
    }
  }

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 select-none bg-blue-200 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm w-fit ">
          <h1 className="text-center font-bold text-5xl">MSA</h1>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up
          </h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-zinc-600 ">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                {/* input filed for fullName of customer */}
                <label
                  htmlFor="fullName"
                  className="block text-md font-bold text-gray-900"
                >
                  Full Name
                </label>

                <div className="mt-2">
                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName", { required: true })}
                    autoComplete="name"
                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6
                  border-2 bg-gray-100 focus:bg-white focus:scale-105
                  "
                  />
                </div>

                {/* input field our email address  */}
                <label
                  htmlFor="email"
                  className="block text-md font-bold text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    type="email"
                    {...register("email", { required: true })}
                    autoComplete="email"
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2 focus:bg-white focus:scale-105"
                  />
                </div>

                {/* input field fur contact number  */}
                <label
                  htmlFor="contactNumber"
                  className="block text-md font-bold text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="contactNumber"
                    type="tel"
                    maxLength={10}
                    {...register("contactNumber", {
                      required: true,
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits only",
                      },
                    })}
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2 focus:bg-white focus:scale-105"
                  />
                </div>

                {/* input field for password */}
                <div className="relative flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-md font-bold text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      pattern: {
                        message:
                          "Password must be minimum of 5 digit/characters",
                      },
                    })}
                    autoComplete="current-password"
                    minLength={5}
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 border-2 focus:bg-white focus:scale-105"
                  />
                  {/* handle password visibility */}
                  <div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                    onClick={handlePasswordVisibility}
                  >
                    {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                  </div>
                </div>
              </div>

              {/* submit button for submitting the form */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-bold text-white shadow-xs hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer border-1 hover:scale-105 transition"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-900">
              Already have an account?
              <Link
                to="/login"
                className="font-bold text-indigo-500 hover:text-indigo-700 p-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
