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
exports.searchDiyTutorials = exports.deleteDiyTutorial = exports.updateDiyTutorial = exports.getDiyTutorialById = exports.getAllDiyTutorials = exports.createDiyTutorial = void 0;
const Diy_1 = __importDefault(require("../models/Diy"));
// Create a new DIY tutorial
const createDiyTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, relatedServicesCategory, description, steps, difficulty, duration, recommendedProducts } = req.body;
        const newDiyTutorial = new Diy_1.default({
            title,
            relatedServicesCategory,
            description,
            steps,
            difficulty,
            duration,
            recommendedProducts
        });
        const savedDiyTutorial = yield newDiyTutorial.save();
        res.status(201).json(savedDiyTutorial);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createDiyTutorial = createDiyTutorial;
// Get all DIY tutorials
const getAllDiyTutorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diyTutorials = yield Diy_1.default.find();
        res.status(200).json(diyTutorials);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllDiyTutorials = getAllDiyTutorials;
// Get a single DIY tutorial by ID
const getDiyTutorialById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const diyTutorial = yield Diy_1.default.findById(id);
        if (!diyTutorial) {
            res.status(404).json({ message: 'DIY tutorial not found' });
            return;
        }
        res.status(200).json(diyTutorial);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getDiyTutorialById = getDiyTutorialById;
// Update a DIY tutorial by ID
const updateDiyTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, relatedServicesCategory, description, steps, difficulty, duration, recommendedProducts } = req.body;
        const updatedDiyTutorial = yield Diy_1.default.findByIdAndUpdate(id, { title, relatedServicesCategory, description, steps, difficulty, duration, recommendedProducts }, { new: true });
        if (!updatedDiyTutorial) {
            res.status(404).json({ message: 'DIY tutorial not found' });
            return;
        }
        res.status(200).json(updatedDiyTutorial);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateDiyTutorial = updateDiyTutorial;
// Delete a DIY tutorial by ID
const deleteDiyTutorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedDiyTutorial = yield Diy_1.default.findByIdAndDelete(id);
        if (!deletedDiyTutorial) {
            res.status(404).json({ message: 'DIY tutorial not found' });
            return;
        }
        res.status(200).json({ message: 'DIY tutorial deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteDiyTutorial = deleteDiyTutorial;
// Search DIY tutorials by name/keywords
const searchDiyTutorials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            res.status(400).json({ message: 'Please provide keywords for searching' });
            return;
        }
        const diyTutorials = yield Diy_1.default.find({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { relatedServicesCategory: { $regex: keyword, $options: 'i' } }
            ]
        });
        res.status(200).json(diyTutorials);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.searchDiyTutorials = searchDiyTutorials;
