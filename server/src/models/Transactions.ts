import mongoose, { Schema, Document } from 'mongoose';
import { orderDocument } from './Order'; 

interface Transaction {
  order: mongoose.Types.ObjectId | orderDocument;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  paymentMethod?: String ;
}

interface TransactionDocument extends Transaction, Document {}

const transactionSchema: Schema<TransactionDocument> = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
  paymentMethod: {type: String}
});

export default mongoose.model<TransactionDocument>('Transaction', transactionSchema);
