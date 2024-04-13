"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchForProducts = exports.searchProductsByPrice = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new Product_1.default({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            availability: req.body.availability,
        });
        const savedProduct = yield newProduct.save();
        res.status(201).json(savedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createProduct = createProduct;
// Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllProducts = getAllProducts;
// Get product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const product = yield Product_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
        }
        else {
            res.status(200).json(product);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getProductById = getProductById;
// Update a product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(productId, {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            availability: req.body.availability,
        });
        if (!updatedProduct) {
            res.status(404).json({ message: 'Product not found' });
        }
        else {
            res.status(200).json(updatedProduct);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateProduct = updateProduct;
// Delete a product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const deletedProduct = yield Product_1.default.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).json({ message: 'Product not found' });
        }
        else {
            res.status(200).json({ message: 'Product deleted successfully' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteProduct = deleteProduct;
// Search products by price
const searchProductsByPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const products = yield Product_1.default.find({
            price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
        });
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.searchProductsByPrice = searchProductsByPrice;
// Search for product by any keyword provided by the user 
const searchForProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryParameter = req.query.searchFor.trim();
        const products = yield Product_1.default.find({
            $or: [
                { name: { $regex: queryParameter, $options: 'i' } },
                { description: { $regex: queryParameter, $options: 'i' } },
                { category: { $regex: queryParameter, $options: 'i' } },
                { price: { $regex: queryParameter, $options: 'i' } },
                { availability: { $regex: queryParameter, $options: 'i' } },
                { rentable: { $regex: queryParameter, $options: 'i' } },
                { photos: { $regex: queryParameter, $options: 'i' } },
                { seller: { $regex: queryParameter, $options: 'i' } },
                { deliveryFees: { $regex: queryParameter, $options: 'i' } }
            ]
        });
        if (!products || products.length === 0) {
            res.status(404).json({ msg: "Sorry, we don't have a product that matches the criteria" });
        }
        else {
            res.status(200).json({ products });
        }
    }
    catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.searchForProducts = searchForProducts;
