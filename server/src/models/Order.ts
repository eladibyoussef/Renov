
import mongoose, { Document, Schema } from 'mongoose';

export interface OrderDocument extends Document {
    products: mongoose.Types.ObjectId[];
    status: string;
    totalPrice: number;
    paymentMethod: string;
    orderDate: Date;
    deliveryStatus: string;
}

const orderSchema: Schema<OrderDocument> = new Schema({
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
    status: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    orderDate: { type: Date, required: true },
    deliveryStatus: { type: String, required: true }
});

export default mongoose.model<OrderDocument>('Order', orderSchema);
