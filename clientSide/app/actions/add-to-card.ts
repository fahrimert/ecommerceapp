'use server'

import { Prisma } from "@prisma/client";
import { kv } from "@vercel/kv";
import { revalidatePath } from "next/cache";
import toast from "react-hot-toast";
type Product = {
    
    id: string;
        categoryId: string;
        order: number;
        name: string;
        price: string;
        quantity: number;
        images: {
            id: string;
            productId: string;
            url: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        anasayfa: boolean;
        ek: Prisma.JsonValue | null;
        stok: number;
        iadeSarti: String;
        isFeatured: Boolean;
        isArchived: Boolean;
        createdAt: Date;
        updatedAt: Date;
}
// Defining the type for Cart objects
export type Cart = {
    userId: string;
    items:{    id: string;
        categoryId: string;
        order: number;
        name: string;
        price: string;
        quantity: number;
        images: {
            id: string;
            productId: string;
            url: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        anasayfa: boolean;
        ek: Prisma.JsonValue | null;
        stok: number;
        iadeSarti: String;
        isFeatured: Boolean;
        isArchived: Boolean;
        createdAt: Date;
        updatedAt: Date;}[]
}

// Function to add an item to the cart
export async function addItem(products:Product[],userId: string, productId: string,path:any) {
    let cart: Cart | null = await kv.get(`testcart-${userId}`);

    const selectedProduct: Product | undefined = products.find(product => product.id === productId);
    if (!selectedProduct) {
        console.error(`Product with id ${productId} not found.`);
        return;
    }
    let myCart = {} as Cart;
    if (!cart || !cart.items) {
        myCart = {
            userId: userId,
            items: [
                {
                    ...selectedProduct,
                    quantity: 1

                }
            ]
        };
    } else {
        let itemFound = false;
        myCart.items = cart.items.map(item => {
            if (item.id === productId) {
                itemFound = true;
                item.quantity += 1;

            }
            return item;
        }) as Cart['items'];
        if (!itemFound) {
            console.log('Adding new item to the cart.');
            myCart.items.push({
                ...selectedProduct,
                quantity: 1,

            });
        }
        else{
            console.log('item already in cart')
        }
    }
    await kv.set(`testcart-${userId}`, myCart);
    revalidatePath(path)
}
export async function delItem(userId: string, productId: string,path:any) {
    // Retrieving the cart based on the user ID
    let cart: Cart | null = await kv.get(`testcart-${userId}`);

    // Checking if the cart and its items exist
    if (cart && cart.items) {
        // Updating the quantity of the item or removing it if quantity becomes zero
        const updatedCart = {
            userId: userId,
            items: cart.items.map(item => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        item.quantity -= 1;
                    } else {
                        return null;
                    }
                }
                return item;
            }).filter(Boolean) as Cart['items'],
        };

        // Saving the updated cart to the KV storage
        await kv.set(`testcart-${userId}`, updatedCart);
        
        // Triggering revalidation of the '/add-to-cart' page
        revalidatePath(path)
    }
}

export async function delAllItem(userId:string){
    const updatedCart = {
        userId: userId,
        items: [] as Product[],
    };
    await kv.set(`testcart-${userId}`,updatedCart)
    revalidatePath('/')
}
