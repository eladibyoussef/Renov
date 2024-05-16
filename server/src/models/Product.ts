import { url } from 'inspector';
import mongoose, { Schema, Document } from 'mongoose';

export interface productDocument extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    availability: boolean;
    rentable?: boolean;
    photos: photo[];
    seller?: mongoose.Types.ObjectId;
    deliveryFees: number;
}
interface photo {
    url: string;
    cloudinaryId: number;
  }
const productSchema: Schema<productDocument> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    availability: { type: Boolean, required: true },
    rentable: { type: Boolean, required: false },
    photos: [{
        url: { type: String, required: false },
        cloudinaryId: { type: String, required: false }    }
    ],
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: false },
    deliveryFees: { type: Number, default: 0 }
});

export default mongoose.model<productDocument>('Product', productSchema);
