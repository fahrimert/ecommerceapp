import { CategoryName, Image, Product } from "@prisma/client";

export type CategoryWithProducts = {images:Image[]} & CategoryName & {products:Product[]}
export type ProductWithCategories= Product & {category:CategoryName}

export type Brah = {images: Image[]} & {product:Product[]} 

export type Imagess = Image