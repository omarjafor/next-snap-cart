'use server'

import connectDB from "@/database"
import Product from "@/models/product";
import { revalidatePath } from "next/cache";

// Add a new product to database Action
export async function createNewProduct(data, path) {
    await connectDB();
    await Product.create(data);
    revalidatePath(path)
}
// fetch all products here Action 
export async function fetchAllProducts(){
    await connectDB();
    const result = await Product.find({});
    if(result){
        return {
            success: true,
            data: JSON.parse(JSON.stringify(result))
        }
    } else {
        return {
            success: false,
            message: 'Something wrong! Please try again'
        }
    }
}
// fetch user added product only by id Action
export async function fetchProductForUser(id) {
    await connectDB();
    const result = await Product.find({ userId: id });
    return JSON.parse(JSON.stringify(result));
}

// fetch single product details action by id 
export async function fetchProductDetailsAction(id) {
    await connectDB();
    const result = await Product.findOne({ _id: id });
    return JSON.parse(JSON.stringify(result));
}

// edit product by user Action 
export async function updateProductAction(data, path) {
    const { _id, title, description, category, price, rating, stock, brand, image } = data;
    const updateProduct = await Product.findOneAndUpdate({ _id: _id }, { title, description, category, price, rating, stock, brand, image }, { new: true });
    if (updateProduct) {
        revalidatePath(path)
        return {
            success: true,
            message: 'Product Updated Successfully'
        }
    } else {
        return {
            success: false,
            message: 'Something wrong! Please try again'
        }
    }
}

// delete a product by user Action
export async function deleteProductAction(id, path) {
    await connectDB();
    const deleteProduct = await Product.findByIdAndDelete(id)
    if (deleteProduct) {
        revalidatePath(path);
        return {
            success: true,
            message: 'Product Deleted Successfully'
        }
    } else {
        return {
            success: false,
            message: 'Something wrong! Please try again'
        }
    }
}