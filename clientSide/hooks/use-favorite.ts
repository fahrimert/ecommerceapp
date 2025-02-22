import { Product } from "@prisma/client";
import {persist,createJSONStorage}  from "zustand/middleware"
import {create} from "zustand"
import toast from "react-hot-toast";

interface FavoriteStore{
    items:Product[]
    addItem : (data:Product) => void
    removeItem: (id:string) => void
    removeAll : ()=> void
}

export const useCart = create(
    persist<FavoriteStore>((set,get) => ({
        items:[],
        addItem:(data:Product)=> {
            const currentItems =get().items
            const existingItem = currentItems.find((item) => item.id === data.id )
            
            if(existingItem) {
                return toast("Item Already In Cart")
            }

            set({items:[...get().items,data]})
             toast.success("Item Added To Card")
     
        },
        removeItem:(id:string) => {
            set({items:[...get().items.filter((item) => item.id !== id)]})
            toast.success("Item Removed From The Cart")
            
        },
        removeAll:() => {
            set({items:[]})
            
        }

    }),{
        name:"cart-storage",
        storage:createJSONStorage(() => localStorage)
    })
)