import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import usersRoutes from "./routes/users.js";
import billsRoutes from "./routes/bills.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/users", usersRoutes);
app.use("/bills", billsRoutes);
const PORT = process.env.PORT || 6001;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL, {})
    .then(() => {
    console.log("Database connected!");
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
    // importProductsFromExcel("../Products.xlsx");
})
    .catch((error) => console.log(`${error} did not connect`));
