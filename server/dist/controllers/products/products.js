import Product from "../../models/Product.js";
export const getProducts = async (req, res) => {
    try {
        await Product.find();
        res.status(200).json(await Product.find());
    }
    catch (error) {
        res.status(500).json(`Something went wrong in finding products. ${error}`);
    }
};
export const getProduct = async (req, res) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    try {
        if (!product) {
            res.status(404).json("No product found.");
        }
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json(`An error occured while getting the product... ${error}`);
    }
};
export const addProduct = async (req, res) => {
    const { name, brand, price, quantity, expirationDate } = req.body;
    const product = await Product.findOne({ name: name });
    try {
        if (product) {
            res.status(400).json("Product already exists!");
        }
        const newProduct = new Product({
            name,
            brand,
            price,
            quantity,
            expirationDate
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        res.status(500).json(`An error occured while adding the product..., ${error}`);
    }
};
export const editProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, brand, price, quantity, expirationDate } = req.body;
    const product = await Product.findById(productId);
    try {
        if (!product) {
            res.status(404).json("Product does not exist.");
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            name,
            brand,
            price,
            quantity,
            expirationDate
        }, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        res.status(500).json(`An error occured while updating the product..., ${error}`);
    }
};
export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        await Product.findByIdAndDelete(productId);
        res.status(200).json("Product was successfully deleted!");
    }
    catch (error) {
        res.status(500).json(`An error occured while deleting the product...`);
    }
};
