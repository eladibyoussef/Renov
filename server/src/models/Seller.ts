import mongoose, { Schema, Document } from 'mongoose';

export interface sellerDocument extends Document {
    name: string;
    companyName: string;
    deliveryRange: string;
    productsList: mongoose.Types.ObjectId[];
    reviews: mongoose.Types.ObjectId[];
     email: string;
    phoneNumber: string;
    password: string; 

}

const sellerSchema: Schema<sellerDocument> = new Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    deliveryRange: { type: String, required: true },
    productsList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }]
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true }
});

export default mongoose.model<sellerDocument>('Seller', sellerSchema);
