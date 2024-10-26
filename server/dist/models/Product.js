import { Schema, model } from "mongoose";
const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 0 },
    expirationDate: { type: Date, required: true }
}, { timestamps: true });
const Product = model("Product", productSchema);
export default Product;
