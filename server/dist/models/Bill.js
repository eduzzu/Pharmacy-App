import { Schema, model } from "mongoose";
;
const billSchema = new Schema({
    products: { type: [Schema.Types.ObjectId], ref: "Product" },
    totalPrice: { type: Number, default: 0.00 },
    active: { type: Boolean, default: false }
});
const Bill = model("Bill", billSchema);
export default Bill;
