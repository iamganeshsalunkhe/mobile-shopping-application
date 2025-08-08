import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAddressStore = create(
    persist(
        (set,get)=>({
            addressId:null,

            setAddressId:(addressId)=>set({addressId}),
            getAddressId:()=>get().addressId,
            clearAddressId:()=>set({addressId:null})
        }),
        {
            name:"userAddressId"
        }
    )
) 