import { Request, Response } from 'express';
import Geolocation from '../models/geolocation';

export const createGeolocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, latitude, longitude } = req.body;
        const geolocation = new Geolocation({ name, latitude, longitude });
        await geolocation.save();
        res.status(201).json({ message: 'Geolocation created successfully', geolocation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAllGeolocations = async (req: Request, res: Response): Promise<void> => {
    try {
        const geolocations = await Geolocation.find();
        res.status(200).json({ geolocations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getGeolocationById = async (req: Request, res: Response): Promise<void> => {
    try {
        const geolocationId = req.params.id;
        const geolocation = await Geolocation.findById(geolocationId);
        if (!geolocation) {
            res.status(404).json({ message: 'Geolocation not found' });
            return;
        }
        res.status(200).json({ geolocation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateGeolocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const geolocationId = req.params.id;
        const { name, latitude, longitude } = req.body;
        const updatedGeolocation = await Geolocation.findByIdAndUpdate(geolocationId, { name, latitude, longitude }, { new: true });
        if (!updatedGeolocation) {
            res.status(404).json({ message: 'Geolocation not found' });
            return;
        }
        res.status(200).json({ message: 'Geolocation updated successfully', geolocation: updatedGeolocation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteGeolocation = async (req: Request, res: Response): Promise<void> => {
    try {
        const geolocationId = req.params.id;
        const deletedGeolocation = await Geolocation.findByIdAndDelete(geolocationId);
        if (!deletedGeolocation) {
            res.status(404).json({ message: 'Geolocation not found' });
            return;
        }
        res.status(200).json({ message: 'Geolocation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
