"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const professionalSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    CIN: { type: String, required: true },
    license: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    servicesProvided: [{ type: String, required: true }],
    certificates: [{ type: String, required: false }],
    cart: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Cart', required: false }],
    quoteRequests: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: false },
    availability: { type: Boolean, required: false },
    overallRating: { type: Number, required: false },
    paymentMethods: [{
            cardType: { type: String, required: false },
            cardNumber: { type: Number, required: false }
        }],
    portfolio: [{
            id: { type: String, required: false },
            title: { type: String, required: false },
            aboutMe: { type: String, required: false },
            mediaType: { type: String, required: false },
            mediaUrl: { type: String, required: false }
        }],
    reviews: [{
            id: { type: String, required: false },
            userId: { type: String, required: false },
            rating: { type: Number, required: false },
            comment: { type: String, required: false }
        }]
});
exports.default = mongoose_1.default.model('Professional', professionalSchema);
