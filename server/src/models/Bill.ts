import { Schema, Types, model } from "mongoose";

export interface IBill {
    products?: Types.ObjectId[],
    totalPrice?: number,
    active?: boolean
};

const billSchema = new Schema({
    products: {type: [Schema.Types.ObjectId], ref: "Product"},
    totalPrice: {type: Number, default: 0.00},
    active: {type: Boolean, default: false}
});

const Bill = model<IBill>("Bill", billSchema);
export default Bill;