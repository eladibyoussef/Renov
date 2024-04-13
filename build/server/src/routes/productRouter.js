"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../controllers/productControllers");
const router = express_1.default.Router();
// Create a new product
router.post('/', productControllers_1.createProduct);
// Get all products
router.get('/', productControllers_1.getAllProducts);
// Get product by ID
router.get('/:productId', productControllers_1.getProductById);
// Update a product
router.put('/:productId', productControllers_1.updateProduct);
// Delete product
router.delete('/:productId', productControllers_1.deleteProduct);
// Search products by price
router.get('/search', productControllers_1.searchProductsByPrice);
exports.default = router;
