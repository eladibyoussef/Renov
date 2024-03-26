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
exports.professionalLogin = exports.changePassword = exports.registrationApproval = void 0;
const Professional_1 = __importDefault(require("../models/Professional"));
const errorCatch_1 = require("../Util/errorCatch");
const bcrypt_1 = __importDefault(require("bcrypt"));
// the controller for the first time professional join requests tha will be later processed and approved by the admin
const registrationRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CIN, license, username, email, phoneNumber, address, servicesProvided } = req.body;
    try {
        const professional = yield Professional_1.default.findOne({ CIN: CIN });
        if (professional) {
            res.status(409).json({ message: 'a request with the prvided information alreadi in process' });
        }
        else {
            const newProfessional = new Professional_1.default({
                CIN,
                license,
                username,
                email,
                phoneNumber,
                address,
                servicesProvided
            });
            const savenewProfessional = yield newProfessional.save();
            if (savenewProfessional) {
                res.status(201).json({ message: 'your request is successfully submitted, we will process it and get back to you as soon as possible ' });
            }
            else {
                res.status(500).json({ message: "internal server error , please try again later" });
            }
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
const registrationApproval = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, temporaryPassword, approvalStatus, reason } = req.body;
    try {
        const professional = yield Professional_1.default.findById(id);
        if (!professional) {
            res.status(404).json({ message: 'cannot find any ongoing request' });
        }
        else {
            professional.approved.approvalStatus = approvalStatus;
            professional.approved.reason = reason;
            professional.isNewPro = true;
            professional.password = temporaryPassword;
            res.send(201).json({ message: 'status updated successfuly' });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.registrationApproval = registrationApproval;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const professional = yield Professional_1.default.findOne({ email });
        if (!professional) {
            res.status(404).json({ message: 'can\'t find any pro account ' });
        }
        else {
        }
    }
    catch (error) {
    }
});
exports.changePassword = changePassword;
const professionalLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const professional = yield Professional_1.default.findOne({ email });
        if (!professional) {
            res.status(404).json({ message: 'can\'t find any pro account ' });
        }
        else {
            if (professional.approved && professional.isNewPro) {
                const checkpassword = yield bcrypt_1.default.
                ;
            }
        }
    }
    catch (error) {
    }
});
exports.professionalLogin = professionalLogin;
