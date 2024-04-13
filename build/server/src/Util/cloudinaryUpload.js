"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const cloudinary_1 = __importDefault(require("../services/cloudinary"));
const uploadFile = (req, res) => {
    if (req.file) {
        const fileUploaded = cloudinary_1.default.uploader.upload(req.file.path, function (err, result) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: err
                });
            }
            return result;
        });
        return fileUploaded;
    }
};
exports.uploadFile = uploadFile;
