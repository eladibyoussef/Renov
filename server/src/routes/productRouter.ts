import express, { Router } from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, searchProductsByPrice } from '../controllers/productControllers';

const router: Router = express.Router();

router.post('/', createProduct);

router.get('/', getAllProducts);

router.get('/:productId', getProductById);

router.put('/:productId', updateProduct);

router.delete('/:productId', deleteProduct);

router.get('/search', searchProductsByPrice);

export default router;
