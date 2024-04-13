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
exports.rateProfessional = exports.searchForPro = exports.deleteProAccount = exports.getProAccount = exports.updateProAccount = exports.getAllprfessionals = exports.professionalLogin = exports.changePassword = exports.registrationApproval = exports.registrationRequest = void 0;
const Professional_1 = __importDefault(require("../models/Professional"));
const errorCatch_1 = require("../Util/errorCatch");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// the controller for the first time professional join requests tha will be later processed and approved by the admin
const registrationRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { CIN, license, username, email, phoneNumber, address, servicesProvided, } = req.body;
    try {
        const professional = yield Professional_1.default.findOne({ CIN: CIN });
        if (professional) {
            res
                .status(409)
                .json({
                message: "a request with the prvided information already in process",
            });
        }
        else {
            const newProfessional = new Professional_1.default({
                CIN,
                license,
                username,
                email,
                phoneNumber,
                address,
                servicesProvided,
            });
            const savenewProfessional = yield newProfessional.save();
            if (savenewProfessional) {
                res
                    .status(201)
                    .json({
                    message: "your request is successfully submitted, we will process it and get back to you as soon as possible ",
                });
            }
            else {
                res
                    .status(500)
                    .json({ message: "internal server error , please try again later" });
            }
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.registrationRequest = registrationRequest;
//the regitration approval route will be accessed by the admin to approve or reject the pro request
const registrationApproval = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, temporaryPassword, approvalStatus, reason, permissions } = req.body;
    try {
        const professional = yield Professional_1.default.findById(id);
        if (!professional) {
            res.status(404).json({ message: "cannot find any ongoing request" });
        }
        else {
            professional.approved.approvalStatus = approvalStatus;
            professional.approved.reason = reason;
            professional.password = temporaryPassword;
            professional.permissions = permissions;
            const updatePro = yield professional.save();
            if (!updatePro) {
                res
                    .status(500)
                    .json({
                    message: "cannot update the information , please try again",
                });
            }
            else {
                res.status(201).json({ message: "status updated successfuly" });
            }
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.registrationApproval = registrationApproval;
// after approval the prfessional can change the default password provided by the admin , and also they can use the same route to change their password
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const professional = yield Professional_1.default.findOne({ email });
        if (!professional) {
            res.status(404).json({ message: "can't find any pro account " });
        }
        else {
            const PasswordsMatch = yield bcrypt_1.default.compare(oldPassword, professional.password);
            if (!PasswordsMatch) {
                res.status(400).json({ message: "invalid credencials" });
            }
            else {
                professional.password = newPassword;
                const updatePro = yield professional.save();
                if (updatePro) {
                    res.status(201).json({ message: 'pessword updated successfully' });
                }
                else {
                    res.status(500).json({ message: 'something went wrong , please try agin later' });
                }
            }
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.changePassword = changePassword;
const professionalLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const professional = yield Professional_1.default.findOne({ email });
        if (!professional) {
            res.status(404).json({ message: "can't find any pro account " });
        }
        else if (professional && professional.approved.approvalStatus) {
            const PasswordsMatch = yield bcrypt_1.default.compare(password, professional.password);
            if (PasswordsMatch) {
                const payload = {
                    id: professional.id,
                    username: professional.username,
                    type: "professional",
                };
                const key = process.env.SECRET || "bsd25hgGG2156ljhcv";
                jsonwebtoken_1.default.sign(payload, key, (err, token) => {
                    if (err) {
                        console.log(err);
                        res
                            .status(500)
                            .json({ message: "failed to complete the sing in process" });
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            user: professional,
                            token: "Bearer " + token,
                        });
                    }
                });
            }
            else {
                res.status(400).json({ msg: "invalid credencials" });
            }
        }
        else {
            res
                .status(403)
                .json({ message: "the requested account cannot be accessed" });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.professionalLogin = professionalLogin;
const getAllprfessionals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { approvalStatus, sort } = req.query;
    try {
        if (!approvalStatus) {
            const professionals = yield Professional_1.default.find();
            if (!professionals) {
                res.status(404).json({ message: "no pros found " });
            }
            else {
                res.status(200).json(professionals);
            }
        }
        else {
            const professionals = yield Professional_1.default.find({ 'approved.approvalStatus': approvalStatus });
            if (!professionals) {
                res.status(404).json({ message: "no pros found " });
            }
            else {
                res.status(200).json(professionals);
            }
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.getAllprfessionals = getAllprfessionals;
const updateProAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const informationToUpdate = req.body;
    delete informationToUpdate.password;
    delete informationToUpdate.permissions;
    delete informationToUpdate.approved;
    console.log(informationToUpdate);
    try {
        const accountToUpdate = yield Professional_1.default.findByIdAndUpdate(id, informationToUpdate, { new: true });
        if (!accountToUpdate) {
            res.status(404).json({ message: "we are sorry , we cant find your accoun" });
        }
        else {
            res.status(200).json({ message: 'account updated', accountToUpdate });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.updateProAccount = updateProAccount;
const getProAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const professional = yield Professional_1.default.find({ email: email });
        if (!professional) {
            res.status(404).json({ message: 'no user found' });
        }
        else {
            res.status(201).json({ professional });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.getProAccount = getProAccount;
const deleteProAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const deletedPro = yield Professional_1.default.findByIdAndDelete(id);
        if (!deletedPro) {
            res.status(404).json({ message: 'professional  not found' });
        }
        res.status(200).json({ message: 'professional account deleted successfully' });
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.deleteProAccount = deleteProAccount;
//the next controller using regular expressions to perform searchs through the professional document
//using multiple keywords , I used the regular expressions in order to assure that if the pro is available in our db it  appears in the results whatever the keywords used
//so basically the user can search by license , name , company, email ... at the same time 
//and only the approved pros will be returned in the search results 
const searchForPro = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keywords = req.query.keywords;
        console.log(keywords);
        let regexPatterns;
        if (Array.isArray(keywords)) {
            regexPatterns = keywords.map(keyword => new RegExp(keyword, 'i'));
        }
        else {
            regexPatterns = [new RegExp(keywords, 'i')];
        }
        console.log(regexPatterns);
        const professionals = yield Professional_1.default.find({
            $and: [
                {
                    $or: [
                        { license: { $in: regexPatterns } },
                        { username: { $in: regexPatterns } },
                        { email: { $in: regexPatterns } },
                        { companyname: { $in: regexPatterns } },
                        { aboutMe: { $in: regexPatterns } },
                        { servicesProvided: { $in: regexPatterns } },
                        { address: { $in: regexPatterns } }
                    ]
                },
                { 'approved.approvalStatus': true }
            ]
        });
        if (!professionals) {
            res.status(404).json({ message: 'cannot find a pro' });
        }
        else {
            res.status(200).json({ results: professionals });
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.searchForPro = searchForPro;
const rateProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { userId, rating, comment } = req.body;
        const proId = req.params.id;
        const professional = yield Professional_1.default.findById(proId);
        if (!professional) {
            res.status(404).json({ message: 'professional not found' });
        }
        else {
            (_a = professional.reviews) === null || _a === void 0 ? void 0 : _a.push({ userId, rating, comment });
            const totalReviews = (_b = professional.reviews) === null || _b === void 0 ? void 0 : _b.length;
            const ratingSum = (_c = professional.reviews) === null || _c === void 0 ? void 0 : _c.reduce((accumulator, review) => accumulator + review.rating, 0);
            if (ratingSum && totalReviews) {
                professional.overallRating = ratingSum / totalReviews;
                const ratingAded = yield professional.save();
                if (!ratingAded) {
                    res.send(500).json({ message: 'internal server error ' });
                }
                res.status(200).json({ message: 'thank you for submitting the review, it was added successfully', ratingaverage: professional.overallRating });
            }
        }
    }
    catch (error) {
        let message;
        message = (0, errorCatch_1.catchError)(error);
        res.status(500).json({ msg: message });
    }
});
exports.rateProfessional = rateProfessional;
