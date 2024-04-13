"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTokenPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const extractTokenPayload = (req) => {
    const authHeader = req.headers.authorization;
    const secret = process.env.SECRET || '155fgnknbdg5dthrth';
    if (!authHeader) {
        return null;
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        return null;
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret);
        console.log(payload);
        return payload;
    }
    catch (error) {
        console.error('Error decoding token:', error.message);
        return null;
    }
};
exports.extractTokenPayload = extractTokenPayload;
