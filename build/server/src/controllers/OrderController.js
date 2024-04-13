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
exports.deleteOrderById = exports.updateOrderById = exports.getOrderById = exports.getAllOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
// Créer une nouvelle commande
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, status, customerId, totalPrice, paymentMethod, orderDate, deliveryStatus } = req.body;
        const newOrder = new Order_1.default({
            products,
            status,
            customerId,
            totalPrice,
            paymentMethod,
            orderDate,
            deliveryStatus
        });
        yield newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createOrder = createOrder;
// Obtenir toutes les commandes
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        res.status(200).json({ orders });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllOrders = getAllOrders;
// Obtenir une commande par son ID
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const order = yield Order_1.default.findById(orderId);
        if (!order) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json({ order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getOrderById = getOrderById;
// Mettre à jour une commande par son ID
const updateOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const updateData = req.body;
        const updatedOrder = yield Order_1.default.findByIdAndUpdate(orderId, updateData, { new: true });
        if (!updatedOrder) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateOrderById = updateOrderById;
// Supprimer une commande par son ID
const deleteOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = yield Order_1.default.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            res.status(404).json({ message: 'Order not found' });
            return;
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteOrderById = deleteOrderById;
