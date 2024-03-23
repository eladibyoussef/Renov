import { Request, Response } from 'express';
import Service, { ServiceDocument } from '../models/Service';

//Creating a new service
const createService = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, price, category } = req.body;
        const newService: ServiceDocument = new Service({
            name,
            description,
            price,
            category
        });
        await newService.save();
        res.status(201).json({ message: 'Service created successfully', service: newService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Updating a service
const updateService = async (req: Request, res: Response): Promise<void> => {
    try {
        const serviceId  = req.params.id;
        const { name, description, price, category } = req.body;
        const updatedService: ServiceDocument | null = await Service.findByIdAndUpdate(
            serviceId,
            { name, description, price, category },
            { new: true }
        );
        if (!updatedService) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        res.status(200).json({ message: 'Service updated successfully', service: updatedService });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Deleting a service
const deleteService = async (req: Request, res: Response): Promise<void> => {
    try {
        const serviceId = req.params.id;
        const deletedService: ServiceDocument | null = await Service.findByIdAndDelete(serviceId);
        if (!deletedService) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fetching all services
const getAllServices = async (req: Request, res: Response): Promise<void> => {
    try {
        const services: ServiceDocument[] = await Service.find();
        res.status(200).json({ services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Searching for services using $regex
const searchService = async (req: Request, res: Response): Promise<void> => {
    try {
        const searchQuery: string = req.query.q as string;
        const services: ServiceDocument[] = await Service.find({
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } },
                { description: { $regex: searchQuery, $options: 'i' } },
                { category: { $regex: searchQuery, $options: 'i' } }
            ]
        });
        res.status(200).json({ services });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export{
    createService,
    updateService,
    deleteService,
    getAllServices,
    searchService
}

