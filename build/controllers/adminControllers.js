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
exports.loginAdmin = exports.registerAdmin = void 0;
const errorCatch_1 = require("../Util/errorCatch");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Admin_1 = __importDefault(require("../models/Admin"));
const console_1 = require("console");
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ref, username, email, password, phoneNumber, address, permissions } = req.body;
    (0, console_1.log)(req.body);
    try {
        const user = yield Admin_1.default.findOne({ email: email });
        if (!user) {
            const newAdmin = new Admin_1.default({
                ref,
                username,
                email,
                password,
                phoneNumber,
                address,
                permissions
            });
            const savedAdmin = yield newAdmin.save();
            console.log("savedAdmin:", savedAdmin);
            if (savedAdmin) {
                res.status(201).json({ msg: "success", user: savedAdmin });
            }
            else {
                res.status(500).json({ msg: "something went wrong , please try again later " });
            }
        }
        else {
            res.status(500).json({ message: "please try other credentials" });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(401).json({ msg: message });
    }
});
exports.registerAdmin = registerAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const admin = yield Admin_1.default.findOne({ email: email });
        if (!admin) {
            res.status(404).json({ msg: "invalid credentials" });
        }
        else {
            const passMatch = yield bcrypt_1.default.compare(password, admin.password);
            if (passMatch) {
                console.log(admin);
                const payload = { id: admin.id, username: admin.username, permissions: admin.permissions, type: 'admin' };
                // console.log('signed payload', payload);
                // console.log('SECRET', process.env.SECRET);              
                jsonwebtoken_1.default.sign(payload, process.env.SECRET || '155fgnknbdg5dthrth', { expiresIn: 3600000 }, (err, token) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ msg: 'Failed to generate token' });
                    }
                    else if (token) {
                        res.status(200).json({
                            success: true,
                            admin: admin,
                            token: "Bearer " + token,
                        });
                    }
                });
            }
            else {
                res.status(401).json({ msg: "Password doesn't match" });
            }
        }
    }
    catch (error) {
        (0, errorCatch_1.catchError)(error);
    }
});
exports.loginAdmin = loginAdmin;
