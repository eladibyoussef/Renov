"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const servicesControllers_1 = require("../controllers/servicesControllers");
const serviceRouter = express_1.default.Router();
// Route to create a new service
serviceRouter.post('/', servicesControllers_1.createService);
// Route to update a service
serviceRouter.put('/:id', servicesControllers_1.updateService);
// Route to delete a service
serviceRouter.delete('/:id', servicesControllers_1.deleteService);
// Route to get all services
serviceRouter.get('/', servicesControllers_1.getAllServices);
// Route to search for services using $regex
serviceRouter.get('/search', servicesControllers_1.searchService);
exports.default = serviceRouter;
