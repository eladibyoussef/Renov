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
exports.searchService = exports.getAllServices = exports.deleteService = exports.updateService = exports.createService = void 0;
const Service_1 = __importDefault(require("../models/Service"));
//Creating a new service
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, subCategories } = req.body;
        const newService = new Service_1.default({
            name,
            description,
            subCategories
        });
        yield newService.save();
        res.status(201).json({ message: 'Service created successfully', service: newService });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createService = createService;
// Updating a service
//to enhance // the service is getting entirly replaced when trying to add a new subcategory
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const { name, description, subCategories } = req.body;
        const updatedService = yield Service_1.default.findByIdAndUpdate(serviceId, { name, description, subCategories }, { new: true });
        if (!updatedService) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        res.status(200).json({ message: 'Service updated successfully', service: updatedService });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateService = updateService;
// Deleting a service
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceId = req.params.id;
        const deletedService = yield Service_1.default.findByIdAndDelete(serviceId);
        if (!deletedService) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteService = deleteService;
// Fetching all services
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield Service_1.default.find();
        res.status(200).json({ services });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllServices = getAllServices;
// Searching for services using $regex
const searchService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.q;
        const services = yield Service_1.default.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { 'subCategories.name': { $regex: searchQuery, $options: 'i' } },
                { 'subCategories.description': { $regex: searchQuery, $options: 'i' } }
            ]
        });
        res.status(200).json({ services });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.searchService = searchService;
