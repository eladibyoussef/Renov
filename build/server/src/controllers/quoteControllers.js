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
exports.getQuote = exports.updateQuote = exports.deleteQuote = exports.uploadQoute = void 0;
const cloudinary_1 = __importDefault(require("../services/cloudinary"));
const errorCatch_1 = require("../Util/errorCatch");
const Quote_1 = __importDefault(require("../models/Quote"));
const cloudinaryUpload_1 = require("../Util/cloudinaryUpload");
const uploadQoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    try {
        const { userId, professionalId, description, status, appointment, totalPrice } = req.body;
        if (req.file) {
            const result = (0, cloudinaryUpload_1.uploadFile)(req, res);
            if (result) {
                const quote = new Quote_1.default({
                    userId,
                    professionalId,
                    description,
                    status,
                    filePath: (yield result).url,
                    publicId: (yield result).public_id,
                    appointment,
                    totalPrice
                });
                const savedQuote = yield quote.save();
                res.status(201).json(savedQuote);
            }
            else {
                res.status(500).json({ error: 'there was a problem uploading the file to the cloud' });
            }
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.uploadQoute = uploadQoute;
const deleteQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quoteId = req.params.id;
    try {
        const quote = yield Quote_1.default.findByIdAndDelete(quoteId);
        if (quote) {
            const result = yield cloudinary_1.default.uploader.destroy(quote === null || quote === void 0 ? void 0 : quote.publicId);
            console.log(result);
            res.status(200).json({ message: " quote deleted successfully ", result });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.deleteQuote = deleteQuote;
const updateQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quoteId = req.params.id;
        const quote = yield Quote_1.default.findById(quoteId);
        if (quote) {
            const deleteResult = yield cloudinary_1.default.uploader.destroy(quote === null || quote === void 0 ? void 0 : quote.publicId);
            const result = (0, cloudinaryUpload_1.uploadFile)(req, res);
            if (result) {
                quote.filePath = (yield result).url;
                quote.publicId = (yield result).public_id;
            }
            const newQuote = yield quote.save();
            if (!newQuote) {
                res.status(500).json({ message: 'internal server error , please try again ' });
            }
            res.status(200).json({ message: 'quote updtated', newQuote });
        }
        else {
            res.status(404).json({ message: "no quote was found " });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.updateQuote = updateQuote;
const getQuote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quoteId = req.params.id;
        const quote = yield Quote_1.default.findById(quoteId);
        if (!quote) {
            res.status(404).json({ message: "no qoute founded" });
        }
        res.status(200).json(quote);
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.getQuote = getQuote;
