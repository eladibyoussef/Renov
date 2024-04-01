"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const professionalControllers_1 = require("../controllers/professionalControllers");
const professionalRouter = express_1.default.Router();
professionalRouter.post('/request-register', professionalControllers_1.registrationRequest);
professionalRouter.post('/approve-request', professionalControllers_1.registrationApproval);
professionalRouter.post('/login', professionalControllers_1.professionalLogin);
exports.default = professionalRouter;
