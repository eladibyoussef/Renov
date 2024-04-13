"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const router = express_1.default.Router();
router.post('/', OrderController_1.createOrder);
router.get('/', OrderController_1.getAllOrders);
router.get('/:orderId', OrderController_1.getOrderById);
router.put('/:orderId', OrderController_1.updateOrderById);
router.delete('/:orderId', OrderController_1.deleteOrderById);
exports.default = router;
