import mongoose, { Schema, Document } from 'mongoose';


export interface orderDocument extends Document  {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    date: Date;
    totalAmount: number;
    status: string;
    shippingAddress: string;
    paymentMethod: string;
    orderItem:orderItem[];
}

interface orderItem extends Document {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    priceAtPurchase: number;
}

const OrderSchema = new Schema<orderDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    orderItem : [
        {
            productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            priceAtPurchase: { type: Number, required: true }
        }
    ]

});

export default mongoose.model<orderDocument>('Order', OrderSchema);
