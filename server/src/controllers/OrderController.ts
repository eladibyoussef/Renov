import { Request, Response } from 'express';
import Order, { OrderDocument } from '../models/Order';

// Créer une nouvelle commande
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { products, status, customerId, totalPrice, paymentMethod, orderDate, deliveryStatus } = req.body;

        const newOrder: OrderDocument = new Order({
            products,
            status,
            customerId,
            totalPrice,
            paymentMethod,
            orderDate,
            deliveryStatus
        });

        await newOrder.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Obtenir toutes les commandes
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders: OrderDocument[] = await Order.find();

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Obtenir une commande par son ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId: string = req.params.orderId;

        const order: OrderDocument | null = await Order.findById(orderId);

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        res.status(200).json({ order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Mettre à jour une commande par son ID
export const updateOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId: string = req.params.orderId;
        const updateData = req.body;

        const updatedOrder: OrderDocument | null = await Order.findByIdAndUpdate(orderId, updateData, { new: true });

        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Supprimer une commande par son ID
export const deleteOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
        const orderId: string = req.params.orderId;

        const deletedOrder: OrderDocument | null = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
