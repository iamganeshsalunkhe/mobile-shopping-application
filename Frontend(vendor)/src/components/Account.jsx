import {useForm} from 'react-hook-form';
import { useQuery,useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import Loader from './Loader';
import Error from './Error';

// async function fetchVendorData(){
//     try {
//         const res = await axios.get("http://localhost:8000/api/vendor/");
//         return res.data;
//     } catch (error) {
//         console.error(error)
//     }
// }
// async function updateVendorData(){
//     try {
//         const res =await axios.patch('http://localhost:8000/api/vendor')
//         return  res.data;
//     } catch (error) {
//         console.error(error)   
//     }
// }


function Account() {
    const queryClient = useQueryClient();
    const {data,isLoading,isError} = useQuery({
        queryKey:['vendorData'],
        
    });

    const {register,handleSubmit,reset} = useForm({
        defaultValues:{
            email:"",
            vendorName:"",
            brandLogo:""
        }
    });

    const mutation = useMutation({
        
        onSuccess:()=>{
            queryClient.invalidateQueries(['vendorData']);
            toast.success("Account updated successfully!");
        }
    });

    useEffect(()=>{
        if(data){
            reset({
                email:data.email,
                vendorName:data.vendorName,
                brandLogo:data.brandLogo
            });
        }
    },[data,reset]);

    function onSubmit(formData){
        mutation.mutate(formData)
    };

    // if (isLoading) return <Loader/>
    // if (isError) return <Error/>

    return (
      <div className=" relative min-h-screen min-w-screen bg-gray-100">
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
              <label className="block text-xl font-medium">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full border rounded px-3 py-2 mt-1 focus-visible:outline-3 focus-visible:outline-gray-950 focus-visible:bg-gray-600"
              />
            </div>

            <div>
              <label className="block text-xl font-medium">Vendor Name</label>
              <input
                type="email"
                {...register("vendorName")}
                className="w-full border rounded px-3 py-2 mt-1focus-visible:outline-3 focus-visible:outline-gray-950 focus-visible:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-xl font-medium">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full border rounded px-3 py-2 mt-1focus-visible:outline-3 focus-visible:outline-gray-950 focus-visible:bg-gray-600"
              />
            </div>

            <div>
              <label className="block text-xl font-medium">Brand Logo</label>
              <input
                type="file"
                {...register("brandLogo")}
                className="w-full border rounded px-3 py-2 mt-1 focus-visible:outline-3 focus-visible:outline-gray-950"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 text-xl
              hover:outline-1 cursor-pointer
              "
            >
              Update my account
            </button>
          </form>
        </div>
      </div>
    );
}

export default Account
