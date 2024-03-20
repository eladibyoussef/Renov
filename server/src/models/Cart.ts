import mongoose, { Schema, Document } from 'mongoose';

interface CartItem {
    product: mongoose.Types.ObjectId; 
    quantity: number;
}

interface Cart extends Document {
    user: mongoose.Types.ObjectId; 
    items: CartItem[];
    created_at: Date;
    updated_at: Date;
}

const CartSchema: Schema<Cart> = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [{
        product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

CartSchema.pre<Cart>('save', function(next) {
    this.updated_at = new Date();
    next();
});

export default mongoose.model<Cart>('ShoppingCart', CartSchema);
