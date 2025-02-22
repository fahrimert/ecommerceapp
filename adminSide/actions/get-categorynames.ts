"use server"
import prismadb from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"



export async function getCategories() {
         const data = await prismadb.categoryName.findMany()
        return data.map((item) => item)
         ;
}
