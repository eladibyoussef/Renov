import mongoose, { Schema, Document } from 'mongoose';

export interface sellerDocument extends Document {
    name: string;
    companyName: string;
    deliveryRange: string;
    productsList: mongoose.Types.ObjectId[];
    reviews: mongoose.Types.ObjectId[];
    
}

const sellerSchema: Schema<sellerDocument> = new Schema({
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    deliveryRange: { type: String, required: true },
    productsList: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    reviews: [{ type: mongoose.Types.ObjectId, ref: 'Review' }]

});

export default mongoose.model<sellerDocument>('Seller', sellerSchema);
