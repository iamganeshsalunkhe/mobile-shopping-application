// import required modules
import { Link } from "react-router-dom";

function Login() {
    return (
      <>
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 select-none bg-green-200">
          {/* header for Login page */}
          <div className="sm:mx-auto sm:w-full sm:max-w-sm shadow-xl lg:min-w-xl p-4 border-1 rounded-md">
            <h1 className="text-center font-bold text-4xl tracking-wider">
              MSA
            </h1>
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>

          {/* input filed for email address */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form  className="space-y-6">
              <div>
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
                    autoComplete="email"
                    className="block w-full rounded-md bg-gray-100 focus:bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 focus:scale-105"
                    />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
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
                    name="password"
                    type='password'
                    className="block w-full rounded-md bg-gray-100 focus:bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 focus:scale-105"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:scale-105 transition cursor-pointer"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-md text-gray-800">
              Don&apos;t have an account with us?
              <Link
                to="/"
                className=" m-2 font-semibold text-indigo-500 hover:text-indigo-800"
              >
                Register yourself
              </Link>
            </p>
          </div>
          </div>
        </div>
      </>
    );

}

export default Login
