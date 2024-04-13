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
exports.deleteSeller = exports.updateSellerProfile = exports.loginSeller = exports.registerSeller = void 0;
const Seller_1 = __importDefault(require("../models/Seller"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, companyName } = req.body;
        const existingSeller = yield Seller_1.default.findOne({ email });
        if (existingSeller) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
        const newSeller = new Seller_1.default({ name, email, password: hashedPassword, companyName });
        yield newSeller.save();
        res.status(201).json({ message: 'Seller registered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.registerSeller = registerSeller;
const loginSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const seller = yield Seller_1.default.findOne({ email });
        if (!seller) {
            res.status(404).json({ msg: "Invalid credentials" });
        }
        else {
            const passwordMatch = yield bcryptjs_1.default.compare(password, seller.password);
            if (passwordMatch) {
                const payload = { id: seller._id, email: seller.email, type: 'seller' };
                const key = process.env.SECRET || 'bsd25hgGG2156ljhcv';
                jsonwebtoken_1.default.sign(payload, key, { expiresIn: 3600000 }, (err, token) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ message: 'Failed to generate token' });
                    }
                    else if (token) {
                        res.status(200).json({
                            success: true,
                            seller: seller,
                            token: "Bearer " + token,
                        });
                    }
                });
            }
            else {
                res.status(400).json({ msg: "Invalid credentials" });
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.loginSeller = loginSeller;
const updateSellerProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sellerId } = req.params;
        const { name, email, companyName } = req.body;
        const existingSeller = yield Seller_1.default.findById(sellerId);
        if (!existingSeller) {
            return res.status(404).json({ message: 'Seller not found' });
        }
        existingSeller.name = name;
        existingSeller.email = email;
        existingSeller.companyName = companyName;
        yield existingSeller.save();
        res.status(200).json({ message: 'Seller profile updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateSellerProfile = updateSellerProfile;
const deleteSeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sellerId } = req.params;
        yield Seller_1.default.findByIdAndDelete(sellerId);
        res.status(200).json({ message: 'Seller account deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteSeller = deleteSeller;
