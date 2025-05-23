import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";

const navigation = [
//   { name: 'Home', href: '/', current: false },
  { name: 'My Products', to: '/products', current: false },
  { name: 'My Orders', to: '/orders', current: false },
  { name: 'My Account', to: '/account', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const location = useLocation();
    const navigate =  useNavigate();
    const queryClient = useQueryClient();


    async function handleLogout(){
      try {
          await axios.post('http://localhost:8000/api/vendor/logout',{},
          {withCredentials:true}
        )
        // clear the cache of react-query
        queryClient.clear();
        toast.success("Logged Out Successfully!")
        navigate('/login')
        
      } catch (error) {
        console.log(error) 
      }
    }

  return (
    <Disclosure as="nav" className="bg-gray-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 select-none">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-start justify-start sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-start justify-start">
              <Link to="/account">
                <p className="text-2xl text-white font-serif ">MSA</p>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.name}
                      to={item.to}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        isActive
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-bold"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-end justify-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div className="cursor-pointer">
                <MenuButton className="relative flex rounded-full bg-gray-800 text-xl focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  {/* <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-12 rounded-full"
                  /> */}
                  <CgProfile className="bg-white rounded-full text-4xl transition" />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block px-5 py-2 text-md text-gray-700 cursor-pointer  font-serif font-bold"
                  >
                    Log out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
