import express from 'express';
import { createOrder, getAllOrders, getOrderById, updateOrderById, deleteOrderById } from '../controllers/OrderController';

const router = express.Router();

    router.post('/', createOrder);

    router.get('/', getAllOrders);

    router.get('/:orderId', getOrderById);

    router.put('/:orderId', updateOrderById);

    router.delete('/:orderId', deleteOrderById);

export default router;
