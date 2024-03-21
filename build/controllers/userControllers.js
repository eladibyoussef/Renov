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
exports.loginUser = exports.registerUser = void 0;
const errorCatch_1 = require("../Util/errorCatch");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const console_1 = require("console");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    (0, console_1.log)(req.body);
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            const newUser = new User_1.default({
                username: username,
                email: email,
                password: password,
            });
            const savedUser = yield newUser.save();
            console.log("savedUser:", savedUser);
            if (savedUser) {
                res.status(201).json({ msg: "success", user: savedUser });
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
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            res.status(404).json({ msg: "invalid credentials" });
        }
        else {
            const passMatch = yield bcrypt_1.default.compare(password, user.password);
            if (passMatch) {
                console.log(user);
                const payload = { id: user.id, username: user.username, type: 'user' };
                console.log('signed payload', payload);
                // console.log('SECRET', process.env.SECRET);              
                jsonwebtoken_1.default.sign(payload, process.env.SECRET || '155fgnknbdg5dthrth', { expiresIn: 3600000 }, (err, token) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ msg: 'Failed to generate token' });
                    }
                    else if (token) {
                        res.status(200).json({
                            success: true,
                            user: user,
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
exports.loginUser = loginUser;
