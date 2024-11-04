import { addProductToBillUtil, deleteProductFromBillUtil } from "../../utils/bills.js";
export const addProductToBill = async (req, res) => {
    const { productId } = req.body;
    try {
        const updatedBill = await addProductToBillUtil(productId);
        res.status(200).json(updatedBill);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding product to bill", error });
    }
};
export const deleteProductFromBill = async (req, res) => {
    const { productId } = req.body;
    try {
        const updatedBill = await deleteProductFromBillUtil(productId);
        res.status(200).json(updatedBill);
    }
    catch (error) {
        res.status(500).json(`An error occured while deleting product from bill... ${error}`);
    }
};
