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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminRouter_1 = __importDefault(require("./routes/adminRouter"));
// import { Application, urlencoded, json } from 'express';
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const database_1 = __importDefault(require("./config/database"));
const dotenv = __importStar(require("dotenv"));
const jwtPassport_1 = require("./config/jwtPassport");
const authorization_1 = require("./middlewares/authorization");
dotenv.config();
const app = (0, express_1.default)();
const PORT = 1337;
database_1.default.on('error', console.error.bind(console, 'Connection error:'));
database_1.default.once('open', () => {
    console.log("Connected to MongoDB Atlas!");
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use('/user', userRouter_1.default);
app.get('/protect', jwtPassport_1.authentication, (req, res) => {
    res.status(200).json({ msg: 'you are connected' });
});
app.get('/superProtect', (0, authorization_1.checkAuthorization)('superAdmin'), jwtPassport_1.authentication, (req, res) => {
    res.status(200).json({ msg: 'you are connected' });
});
app.use('/admin', adminRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
