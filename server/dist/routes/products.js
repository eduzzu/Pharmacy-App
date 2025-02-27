import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { addProduct, editProduct, getProduct, getProducts, deleteProduct } from "../controllers/products/products.js";
const router = express.Router();
router.get("/", verifyToken, getProducts);
router.get("/:productId", verifyToken, getProduct);
router.post("/add", verifyToken, addProduct);
router.put("/edit/:productId", verifyToken, editProduct);
router.delete("/delete/:productId", verifyToken, deleteProduct);
export default router;
