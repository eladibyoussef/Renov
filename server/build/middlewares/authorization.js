"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthorization = void 0;
const helpers_1 = require("../Util/helpers");
const checkAuthorization = (role) => (req, res, next) => {
    const payload = (0, helpers_1.extractTokenPayload)(req);
    if (payload.permissions && payload.permissions.includes(role)) {
        next();
    }
    else {
        return res.status(403).json({ message: "Forbidden" });
    }
};
exports.checkAuthorization = checkAuthorization;
