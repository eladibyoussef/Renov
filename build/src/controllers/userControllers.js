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
const User_1 = __importDefault(require("../models/User"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const user = yield User_1.default.findOne({ email: email });
        if (!user) {
            const newUser = new User_1.default({
                name: name,
                email: email,
                password: password,
            });
            const savedUser = yield newUser.save();
            console.log("savedUser:", savedUser);
            if (savedUser) {
                res.status(201).json({ msg: "success", user: savedUser });
            }
            else {
                res
                    .status(500)
                    .json({ msg: "something went wrong , please try again later " });
            }
        }
        else {
            res.status(500).json({ message: "please try other credentials" });
        }
    }
    catch (error) {
        res.status(401).json({ msg: error.msg });
    }
});
exports.default = registerUser;
