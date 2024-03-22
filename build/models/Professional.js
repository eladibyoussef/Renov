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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const professionalSchema = new mongoose_1.Schema({
    CIN: { type: String, required: true },
    license: { type: String, required: true },
    anthropometricCertificate: { type: String, required: false },
    username: { type: String, required: true },
    companyname: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    profilePicture: { type: String, required: false },
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
    aboutMe: { type: String, required: false },
    portfolio: [{
            title: { type: String, required: false },
            mediaType: { type: String, required: false },
            mediaUrl: { type: String, required: false }
        }],
    reviews: [{
            userId: { type: String, required: false },
            rating: { type: Number, required: false },
            comment: { type: String, required: false }
        }],
    approved: {
        approvalStatus: { type: Boolean, required: true, default: false },
        reason: { type: String, required: false }
    },
});
professionalSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            return next();
        }
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(this.password, salt);
            this.password = hashedPassword;
            next();
        }
        catch (error) {
            console.log(error);
            next(error);
        }
    });
});
professionalSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
    }
});
exports.default = mongoose_1.default.model('Professional', professionalSchema);
