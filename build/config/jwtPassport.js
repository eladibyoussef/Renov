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
exports.authentication = void 0;
const passport_1 = __importDefault(require("passport"));
const errorCatch_1 = require("../Util/errorCatch");
const passport_jwt_1 = require("passport-jwt");
const User_1 = __importDefault(require("../models/User"));
const Admin_1 = __importDefault(require("../models/Admin"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const options = {};
options.jwtFromRequest = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;
passport_1.default.use('jwt', new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload);
    // console.log('jwt',options.jwtFromRequest);
    console.log('options', options);
    console.log('load inside jwt strategy', payload);
    try {
        let user;
        if (payload.type == 'user') {
            user = yield User_1.default.findById(payload.id);
        }
        else if (payload.type == 'admin') {
            user = yield Admin_1.default.findById(payload.id);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        let message = (0, errorCatch_1.catchError)(error);
        console.log('error caught', message);
    }
})));
exports.authentication = passport_1.default.authenticate('jwt', { session: false });
