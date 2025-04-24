// import required files
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';


function Signup() {
    const {register, handleSubmit} = useForm();
    const onSubmit = data=>console.log(data);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    // handle password visibility
    function handlePassword(){
      setIsPasswordVisible((prev)=>!prev)
    }

    return (
      <div className=" relative flex min-h-screen items-center justify-start px-5 py-4 bg-grey-200 ">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1640695186958-470133dee50f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTV8fG1vYmlsZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20" />
        </div>
        <div className=" relative z-10 bg-gray-100 w-full max-w-xl  bg-opacity-80 backdrop-blur-md shadow-2xl rounded-xl px-2 py-4 ml-4 md:ml-12 lg:ml-24">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="text-center text-4xl font-bold font-serif tracking-widest">
              MSA
            </h1>
            <h4 className="text-center mt-1 font-bold font-sans">
              Grow with us!!!
            </h4>
            <h2 className="mt-2 text-center text-2xl/9 font-bold  text-gray-900">
              Sign up as Vendor
            </h2>
          </div>

          <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* get vendorName from user */}
              <div>
                <label
                  htmlFor="vendorName"
                  className="block text-xl font-medium text-gray-900"
                >
                  Vendor Name
                </label>
                <input
                  id="vendorName"
                  type="text"
                  {...register("vendorName", { required: true, minLength: 3 })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-600 focus:outline-3 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2 font-medium "
                />
              </div>

              {/* get email from user */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xl font-medium text-gray-900"
                >
                  Vendor email address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-600 focus:outline-3 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2 font-medium "
                />
              </div>

              {/* get password from user */}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-xl font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("password", { required: true, minLength: 6 })}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-xl text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-600 focus:outline-3 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mt-2 font-medium "
                />
                <div
                  className="absolute right-2 top-3/4   transform -translate-y-1/2 cursor-pointer text-grey-300"
                  onClick={handlePassword}
                >
                  {isPasswordVisible ? <FaRegEyeSlash /> : <FaRegEye />}
                </div>
              </div>

              <div>
                <label
                  htmlFor="brandLogo"
                  className="block text-xl font-medium text-gray-900 mb-3"
                >
                  Brand Logo
                </label>
                <input
                  id="brandLogo"
                  type="file"
                  {...register("brandLogo")}
                  className="block w-full rounded-md bg-white px-3 py-2 text-gray-900 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-800"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-bold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-md text-gray-700 font-serif mb-4 font-semibold">
              already have an account?
              <Link
                to="/login"
                className="font-semibold text-indigo-500 hover:text-indigo-900 px-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}

export default Signup
