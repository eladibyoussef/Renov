import express, { Router } from 'express';
import { createService, updateService, deleteService, getAllServices, searchService } from '../controllers/servicesControllers';

const serviceRouter: Router = express.Router();

// Route to create a new service
serviceRouter.post('/', createService);

// Route to update a service
serviceRouter.put('/:id', updateService);

// Route to delete a service
serviceRouter.delete('/:id', deleteService);

// Route to get all services
serviceRouter.get('/', getAllServices);

// Route to search for services using $regex
serviceRouter.get('/search', searchService);

export default serviceRouter;
