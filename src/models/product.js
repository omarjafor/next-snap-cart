import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    userId: String,
    title: String,
    description: String,
    category: String,
    price: Number,
    rating: Number,
    stock: Number,
    brand: String,
    image: String,
    tags: Array
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export default Product;