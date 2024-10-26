import xlsx from "xlsx";
import Product from "../models/Product.js";
export const importProductsFromExcel = async (filePath) => {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        const products = data
            .map((row) => {
            let expirationDate = null;
            if (typeof row.expirationDate === "number") {
                const dateInfo = xlsx.SSF.parse_date_code(row.expirationDate);
                const { y, m, d } = dateInfo;
                expirationDate = new Date(y, m - 1, d);
            }
            else if (typeof row.expirationDate === "string") {
                expirationDate = new Date(row.expirationDate);
                if (isNaN(expirationDate.getTime())) {
                    const parts = row.expirationDate.split("/");
                    if (parts.length === 3) {
                        expirationDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                    }
                }
            }
            if (expirationDate && !isNaN(expirationDate.getTime())) {
                return {
                    name: row.name,
                    brand: row.brand,
                    price: row.price,
                    quantity: row.quantity,
                    expirationDate: expirationDate,
                };
            }
            else {
                console.error("Data expirării invalidă:", row.expirationDate);
                return null;
            }
        })
            .filter((product) => product !== null);
        await Product.insertMany(products);
        console.log("Products successfully added to database");
    }
    catch (error) {
        console.error("An error occurred while adding products from Excel to DB...", error);
    }
};
