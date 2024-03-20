import mongoose, { Schema, Document } from 'mongoose';

interface Product extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    availability: boolean;
    rentable?: boolean;
    photos: string[];
    seller?: mongoose.Types.ObjectId;
    deliveryFees: number;
}

const productSchema: Schema<Product> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    availability: { type: Boolean, required: true },
    rentable: { type: Boolean, required: false },
    photos: { type: [String], required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: false },
    deliveryFees: { type: Number, default: 0 }
});

export default mongoose.model<Product>('Product', productSchema);
