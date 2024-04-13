"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quoteControllers_1 = require("../controllers/quoteControllers");
const multer_1 = __importDefault(require("../middlewares/multer"));
const quoteRouter = express_1.default.Router();
quoteRouter.post('/upload', multer_1.default.single('quote'), quoteControllers_1.uploadQoute);
quoteRouter.delete('/delete/:id', quoteControllers_1.deleteQuote);
quoteRouter.put('/update/:id', multer_1.default.single('quote'), quoteControllers_1.updateQuote);
exports.default = quoteRouter;
