"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userControllers_1 = require("../controllers/userControllers");
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.post('/register', userControllers_1.registerUser);
userRouter.get('/login', userControllers_1.loginUser);
userRouter.get('/:id', userControllers_1.getProfile);
userRouter.put('/:id', userControllers_1.updateProfile);
userRouter.delete('/:id', userControllers_1.deleteProfile);
exports.default = userRouter;
