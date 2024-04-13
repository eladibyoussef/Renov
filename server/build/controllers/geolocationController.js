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
exports.deleteGeolocation = exports.updateGeolocation = exports.getGeolocationById = exports.getAllGeolocations = exports.createGeolocation = void 0;
const geolocation_1 = __importDefault(require("../models/geolocation"));
const createGeolocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, latitude, longitude } = req.body;
        const geolocation = new geolocation_1.default({ name, latitude, longitude });
        yield geolocation.save();
        res.status(201).json({ message: 'Geolocation created successfully', geolocation });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.createGeolocation = createGeolocation;
const getAllGeolocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const geolocations = yield geolocation_1.default.find();
        res.status(200).json({ geolocations });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getAllGeolocations = getAllGeolocations;
const getGeolocationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const geolocationId = req.params.id;
        const geolocation = yield geolocation_1.default.findById(geolocationId);
        if (!geolocation) {
            res.status(404).json({ message: 'Geolocation not found' });
            return;
        }
        res.status(200).json({ geolocation });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getGeolocationById = getGeolocationById;
const updateGeolocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const geolocationId = req.params.id;
        const { name, latitude, longitude } = req.body;
        const updatedGeolocation = yield geolocation_1.default.findByIdAndUpdate(geolocationId, { name, latitude, longitude }, { new: true });
        if (!updatedGeolocation) {
            res.status(404).json({ message: 'Geolocation not found' });
            return;
        }
        res.status(200).json({ message: 'Geolocation updated successfully', geolocation: updatedGeolocation });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateGeolocation = updateGeolocation;
const deleteGeolocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const geolocationId = req.params.id;
        const deletedGeolocation = yield geolocation_1.default.findByIdAndDelete(geolocationId);
        if (!deletedGeolocation) {
            res.status(404).json({ message: 'Geolocation not found' });
            return;
        }
        res.status(200).json({ message: 'Geolocation deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteGeolocation = deleteGeolocation;
