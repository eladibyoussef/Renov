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
const proffessionalRoutes_1 = __importDefault(require("./routes/proffessionalRoutes"));
const reviewRouter_1 = __importDefault(require("./routes/reviewRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const servicesRouter_1 = __importDefault(require("./routes/servicesRouter"));
const diyRouter_1 = __importDefault(require("./routes/diyRouter"));
const paymentRoute_1 = __importDefault(require("./routes/paymentRoute"));
const sallerRouter_1 = __importDefault(require("./routes/sallerRouter"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const geolocationRoutre_1 = __importDefault(require("./routes/geolocationRoutre"));
const database_1 = __importDefault(require("./config/database"));
const dotenv = __importStar(require("dotenv"));
const jwtPassport_1 = require("./config/jwtPassport");
const authorization_1 = require("./middlewares/authorization");
const chatRouter_1 = __importDefault(require("./routes/chatRouter"));
const socket_1 = require("./socket/socket");
const quoteRouter_1 = __importDefault(require("./routes/quoteRouter"));
dotenv.config();
const PORT = 1337;
const secret = process.env.SECRET;
database_1.default.on('error', console.error.bind(console, 'Connection error:'));
database_1.default.once('open', () => {
    console.log("Connected to MongoDB Atlas!");
});
socket_1.app.use(express_1.default.urlencoded({ extended: false }));
socket_1.app.use(express_1.default.json());
socket_1.app.get('/superProtect', (0, authorization_1.checkAuthorization)('superAdmin'), jwtPassport_1.authentication, (req, res) => {
    res.status(200).json({ msg: 'you are connected' });
});
socket_1.app.use('/admin', adminRouter_1.default);
socket_1.app.use('/user', userRouter_1.default);
socket_1.app.use('/pro', proffessionalRoutes_1.default);
socket_1.app.use('/reviews', reviewRouter_1.default);
socket_1.app.use('/services', servicesRouter_1.default);
socket_1.app.use('/diy', diyRouter_1.default);
socket_1.app.use('/payment', paymentRoute_1.default);
socket_1.app.use('/pro', proffessionalRoutes_1.default);
socket_1.app.use('/seller', sallerRouter_1.default);
socket_1.app.use('/services', servicesRouter_1.default);
socket_1.app.use('/diy', diyRouter_1.default);
socket_1.app.use('/messages', chatRouter_1.default);
socket_1.app.use('/quote', quoteRouter_1.default);
socket_1.app.use('/order', OrderRoute_1.default);
socket_1.app.use('/geolocation', geolocationRoutre_1.default);
socket_1.app.get('/', (req, res) => {
    res.send('hello from server');
});
socket_1.server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
