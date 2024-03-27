import express, { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProductsByPrice } from '../controllers/productControllers';

const router: Router = express.Router();

// Create a new product
router.post('/', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get product by ID
router.get('/:productId', getProductById);

// Update a product
router.put('/:productId', updateProduct);

// Delete product
router.delete('/:productId', deleteProduct);

// Search products by price
router.get('/search', searchProductsByPrice);

export default router;
