import express from 'express';
import { createGeolocation, getAllGeolocations, getGeolocationById, updateGeolocation, deleteGeolocation } from '../controllers/geolocationController';

const router = express.Router();

router.post('/', createGeolocation);

router.get('/', getAllGeolocations);

router.get('/:geolocationId', getGeolocationById);

router.put('/:geolocationId', updateGeolocation);

router.delete('/:geolocationId', deleteGeolocation);

export default router;
