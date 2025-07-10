// import required modules
import {create} from 'zustand';
import {devtools,persist} from'zustand/middleware';

export const useAuthStore = create(
    devtools(
    // to store persist data even when page-reloads(in localStorage)
    persist(
        (set) =>({
            isAuthenticated:false,

            // login sets auth state to true
            login:()=>set({isAuthenticated:true}),

            // logout sets auth state to false
            logout:()=>set({isAuthenticated:false})
        }),
        {
            name:'Auth-Session',// localStorage key

            // partialize is function that filters the state
            // only save isAuthenticated in localStorage
            partialize:(state)=>({isAuthenticated:state.isAuthenticated})
        }
    )
    )
)