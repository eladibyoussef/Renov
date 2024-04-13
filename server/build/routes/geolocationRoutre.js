"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const geolocationController_1 = require("../controllers/geolocationController");
const router = express_1.default.Router();
router.post('/', geolocationController_1.createGeolocation);
router.get('/', geolocationController_1.getAllGeolocations);
router.get('/:geolocationId', geolocationController_1.getGeolocationById);
router.put('/:geolocationId', geolocationController_1.updateGeolocation);
router.delete('/:geolocationId', geolocationController_1.deleteGeolocation);
exports.default = router;
