"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sallerController_1 = require("../controllers/sallerController");
const router = express_1.default.Router();
router.post('/register', sallerController_1.registerSeller);
router.post('/login', sallerController_1.loginSeller);
router.put('/:sellerId/update', sallerController_1.updateSellerProfile);
router.delete('/:sellerId/delete', sallerController_1.deleteSeller);
exports.default = router;
