import { Request, Response } from 'express';
import DiyTutorial, { DiyTutorialDocument } from '../models/Diy';

// Create a new DIY tutorial
export const createDiyTutorial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, relatedServicesCategory, description, steps, difficulty, duration, recommendedProducts } = req.body;
        const newDiyTutorial: DiyTutorialDocument = new DiyTutorial({
            title,
            relatedServicesCategory,
            description,
            steps,
            difficulty,
            duration,
            recommendedProducts
        });
        const savedDiyTutorial = await newDiyTutorial.save();
        res.status(201).json(savedDiyTutorial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all DIY tutorials
export const getAllDiyTutorials = async (req: Request, res: Response): Promise<void> => {
    try {
        const diyTutorials = await DiyTutorial.find();
        res.status(200).json(diyTutorials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single DIY tutorial by ID
export const getDiyTutorialById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const diyTutorial = await DiyTutorial.findById(id);
        if (!diyTutorial) {
            res.status(404).json({ message: 'DIY tutorial not found' });
            return;
        }
        res.status(200).json(diyTutorial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a DIY tutorial by ID
export const updateDiyTutorial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, relatedServicesCategory, description, steps, difficulty, duration, recommendedProducts } = req.body;
        const updatedDiyTutorial = await DiyTutorial.findByIdAndUpdate(
            id,
            { title, relatedServicesCategory, description, steps, difficulty, duration, recommendedProducts },
            { new: true }
        );
        if (!updatedDiyTutorial) {
            res.status(404).json({ message: 'DIY tutorial not found' });
            return;
        }
        res.status(200).json(updatedDiyTutorial);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a DIY tutorial by ID
export const deleteDiyTutorial = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedDiyTutorial = await DiyTutorial.findByIdAndDelete(id);
        if (!deletedDiyTutorial) {
            res.status(404).json({ message: 'DIY tutorial not found' });
            return;
        }
        res.status(200).json({ message: 'DIY tutorial deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Search DIY tutorials by name/keywords
export const searchDiyTutorials = async (req: Request, res: Response): Promise<void> => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
            res.status(400).json({ message: 'Please provide keywords for searching' });
            return;
        }
        const diyTutorials = await DiyTutorial.find({
            $or: [
                { title: { $regex: keyword as string, $options: 'i' } },
                { description: { $regex: keyword as string, $options: 'i' } },
                { relatedServicesCategory: { $regex: keyword as string, $options: 'i' } }
            ]
        });
        res.status(200).json(diyTutorials);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
