import mongoose, { Schema, Document } from 'mongoose';

interface IContract extends Document {
    quoteRequestId: mongoose.Types.ObjectId;
    status: string;
    commission: number;
}

const contractSchema: Schema<IContract> = new Schema({
    quoteRequestId: { type: Schema.Types.ObjectId, ref: 'QuoteRequest', required: true },
    status: { type: String, enum: ['completed', 'cancelled'], required: true },
    commission: { type: Number, required: true }
});

export default mongoose.model<IContract>('Contract', contractSchema);
