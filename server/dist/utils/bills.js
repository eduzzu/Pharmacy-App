import { Types } from "mongoose";
import Bill from "../models/Bill.js";
import Product from "../models/Product.js";
export const findOrCreateBill = async () => {
    try {
        let bill = await Bill.findOne({ active: true });
        if (!bill) {
            bill = new Bill();
            bill.active = true;
            await bill.save();
        }
        return bill;
    }
    catch (error) {
        throw new Error(`An error occured while creating the bill... ${error}`);
    }
};
export const addProductToBillUtil = async (productId) => {
    const bill = await findOrCreateBill();
    if (bill.active) {
        bill.products?.push(new Types.ObjectId(productId));
        const product = await Product.findById(productId);
        if (product) {
            bill.totalPrice = bill.totalPrice + product.price;
        }
        await bill.save();
    }
    bill.active = false;
    return bill;
};
export const deleteProductFromBillUtil = async (productId) => {
    try {
        const bill = await findOrCreateBill();
        const productIndex = bill.products?.findIndex((item) => item.toString() === productId);
        if (productIndex > -1) {
            const product = await Product.findById(productId);
            if (product) {
                bill.totalPrice -= product.price;
            }
            bill.products?.splice(productIndex, 1);
            await bill.save();
        }
        return bill;
    }
    catch (error) {
        throw new Error(`Product not found in the bill... ${error}`);
    }
};
