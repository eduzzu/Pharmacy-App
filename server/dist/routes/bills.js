import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { addProductToBill, deleteProductFromBill } from "../controllers/bills/bills.js";
const router = express.Router();
router.post("/add-products-to-bill", verifyToken, addProductToBill);
router.delete("/delete-product-from-bill", verifyToken, deleteProductFromBill);
export default router;
