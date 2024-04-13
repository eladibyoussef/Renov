"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminControllers_1 = require("../controllers/adminControllers");
const express_1 = __importDefault(require("express"));
const adminRouter = express_1.default.Router();
adminRouter.post('/register', adminControllers_1.registerAdmin);
adminRouter.get('/login', adminControllers_1.loginAdmin);
adminRouter.delete('/:id', adminControllers_1.deleteAdmin);
exports.default = adminRouter;
