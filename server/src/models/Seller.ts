import mongoose, { Schema, Document } from 'mongoose';

interface Seller extends Document {
    name: string;
    companyName: string;
    deliveryRange: string;
    productsList: mongoose.Types.ObjectId[];
}

const sellerSchema: Schema<Seller> = new Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    deliveryRange: { type: String, required: true },
    productsList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model<Seller>('Seller', sellerSchema);
