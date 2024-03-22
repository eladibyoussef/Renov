import { Request, Response } from 'express';
import Product, {productDocument} from '../models/Product';

// Create a new product
const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct: productDocument = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      availability: req.body.availability, 
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all products
const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get product by ID
const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a product
const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        availability: req.body.availability,
      
      });

    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json(updatedProduct);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a product
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.status(200).json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Search products by price
const searchProductsByPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const minPrice: string = req.query.minPrice as string;
    const maxPrice: string= req.query.maxPrice as string ;

    const products = await Product.find({
      price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Search for product by any keyword provided by the user 

const searchForProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const queryParameter: string = (req.query.searchFor as string).trim();
        const products: productDocument[] = await Product.find({
            $or: [
                { name: { $regex: queryParameter, $options: 'i' } },
                { description: { $regex: queryParameter, $options: 'i' } },
                { category: { $regex: queryParameter, $options: 'i' } },
                { price: { $regex: queryParameter, $options: 'i' } },
                { availability: { $regex: queryParameter, $options: 'i' } },
                { rentable: { $regex: queryParameter, $options: 'i' } },
                { photos: { $regex: queryParameter, $options: 'i' } },
                { seller: { $regex: queryParameter, $options: 'i' } },
                { deliveryFees: { $regex: queryParameter, $options: 'i' } }
            ]
        });

        if (!products || products.length === 0) {
            res.status(404).json({ msg: "Sorry, we don't have a product that matches the criteria" });
        } else {
            res.status(200).json({ products });
        }
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProductsByPrice,
    searchForProducts
  };