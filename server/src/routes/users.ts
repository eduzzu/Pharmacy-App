import express from "express";
import { verifyToken } from "../middleware/middleware.js";
import { getUser, getUsers } from "../controllers/users/users.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:userId", verifyToken, getUser);

export default router;