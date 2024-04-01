import mongoose, { Schema, Document } from 'mongoose';

interface Seller extends Document {
    name: string;
    companyName: string;
    deliveryRange: string;
    productsList: mongoose.Types.ObjectId[];
    email: string;
    phoneNumber: string;
    password: string; 

}

const sellerSchema: Schema<Seller> = new Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    deliveryRange: { type: String, required: true },
    productsList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

export default mongoose.model<Seller>('Seller', sellerSchema);
