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
exports.handlePayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorCatch_1 = require("../Util/errorCatch");
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '');
const handlePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: 1000,
            currency: 'mad',
            payment_method_types: ['card'],
            payment_method: token,
            confirm: true,
        });
        res.status(200).json({ message: 'Payment successful', paymentIntent });
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.handlePayment = handlePayment;
