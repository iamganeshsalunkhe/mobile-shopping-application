import {useForm} from 'react-hook-form';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import Loader from './Loader';
import Error from './Error';
import {useNavigate} from 'react-router-dom';

// function for fetching account details of loggedin user
async function fetchVendorData(){
    try {
        const res = await axios.get("http://localhost:8000/api/vendor/account",{
          withCredentials:true
        });
        return res.data;
    } catch (error) {
        console.error(error.message)
    }
}

// function for updating an account
async function updateVendorData(formData){
    try {
        const res = await axios.put(
          "http://localhost:8000/api/vendor/account",
          formData,
          { withCredentials: true }
        );
        return  res.data;
    } catch (error) {
        console.error(error)   
    }
}
 // function for deleting an account
async function deleteVendorAccount(vendorId){
      try {
        const res = await axios.delete('http://localhost:8000/api/vendor/account',   
          {
          data: { vendorId },
          withCredentials:true
          },
        )
        return res.data;
        } catch (error) {
        console.error(error)
        throw error;
      }
}



function Account() {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const {data,isLoading,isError} = useQuery({
        queryKey:['vendorData'],
        queryFn:fetchVendorData
    });

    const {register,handleSubmit,reset} = useForm({
        defaultValues:{
            email:"",
            vendorName:""
        }
    });
    
    // update the account details
    const updateAccount = useMutation({
        mutationFn:updateVendorData,
        onSuccess:()=>{
          toast.success("Account updated successfully!");
            queryClient.invalidateQueries(['vendorData']);
        },
        onError:(error)=>{
          console.log(error)
          const message = error.response?.data?.message || "Failed to update account info"
          toast.error(message)
        }
    });

    const deleteAccount = useMutation({
      mutationFn:deleteVendorAccount,
      onSuccess:()=>{
        toast.success('Account deleted successfully');
        navigate('/login')
      },
      onError:(error)=>{
        console.error(error);
        const message = error.response?.data?.message || "Failed to delete account";
        toast.error(message);
      }
    })

    useEffect(()=>{
        if(data){
            reset({
                email:data.email,
                vendorName:data.vendorName
            });
        }
    },[data,reset]);

    function onSubmit(formData){
        updateAccount.mutate(formData)
    };


   
    if (isLoading) return <Loader/>
    if (isError) return <Error/>

    return (
      <div className=" relative min-h-screen min-w-screen bg-gray-100 select-none">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xTcU45UTFPcEtqUXx8ZW58MHx8fHx8')",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-30" />
        </div>

        <div className=" relative max-w-xl mx-auto p-4 min-h-screen w-full z-10  text-white bg-opacity-70  ">
          <h2 className="text-4xl text-center font-bold mb-4 text-gray-100">
            My Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xl font-medium ">Email : </label>
              <input
                type="email"
                {...register("email")}
                className="w-full border  rounded px-3 py-2 mt-1 focus-visible:outline-2 focus-visible:outline-gray-950 focus-visible:bg-gray-600 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xl font-medium">
                Vendor Name :{" "}
              </label>
              <input
                type="text"
                {...register("vendorName")}
                className="w-full border  rounded px-3 py-2 mt-1 focus-visible:outline-3 focus-visible:outline-gray-950 focus-visible:bg-gray-600 font-semibold"
              />
            </div>
          <div className='flex items-center gap-6 '>
            <div >
              <label className="block text-xl font-medium mb-2"> Brand Logo :</label>

              {data.brandLogo ? (<img
              src={data.brandLogo}
              width={200} 
              height={200} 
              className='rounded-lg border border-gray-300'
              /> ):(
                <div className='w-[200px] h-[200px] rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50'>
                  <span className='text-gray-500'>No Logo</span>
                </div>
              )}

            </div>
            <div className='flex  gap-5 '>
              <button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 hover:scale-115 cursor-pointer'>
                  Update logo
              </button>
              <button
              className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300 hover:scale-115 cursor-pointer'
              >Delete logo</button>

            </div>
          </div>

            {/* <div>
              <label className="block text-xl font-medium">Brand Logo :</label>
              <input
                type="file"
                {...register("brandLogo")}
                className="w-full border rounded px-3 py-2 mt-1 focus-visible:outline-3 focus-visible:outline-gray-950"
              />
            </div> */}
            <div className="text-center ">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-800 text-xl
              hover:outline-1 cursor-pointer transition hover:scale-110
              "
              >
                Update my account
              </button>
            </div>
          </form>
          <div className="text-center ">
            <button
              type="button"
              onClick={() => {
                const isConfirmed = window.confirm(
                  "Do you really want to delete your account ?? This action can't be reverted back!!"
                );
                if (isConfirmed) {
                  deleteAccount.mutate(data.vendorId);
                }
              }}
              className="bg-red-600 text-white px-4 py-3 mt-4 rounded-xl hover:bg-red-800 text-xl
              hover:outline-1 cursor-pointer transition hover:scale-110 
              "
            >
              Delete my account
            </button>
          </div>
        </div>
      </div>
    );
}

export default Account
