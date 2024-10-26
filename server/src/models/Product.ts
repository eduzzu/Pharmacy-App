import { Schema, model} from "mongoose";

export interface IProduct {
    name: string,
    brand: string,
    price: number,
    quantity: number,
    expirationDate: Date
}

const productSchema = new Schema({
    name: {type: String, required: true, unique: true},
    brand: {type: String, required: true},
    price: {type: Number, required: true, min: 1},
    quantity: {type: Number, required: true, min: 0},
    expirationDate: {type: Date, required: true}
}, {timestamps: true});

const Product = model<IProduct>("Product", productSchema);
export default Product;