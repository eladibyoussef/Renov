import mongoose, { Document, Schema } from 'mongoose';

interface QuoteDocument extends Document {
  userId: mongoose.Types.ObjectId;
  professionalId: mongoose.Types.ObjectId;
  description: string;
  status: string;
  filePath: string;
  appointment: {
    date: Date;
    location: string;
  };
  totalPrice: number;
}

const quoteSchema = new Schema<QuoteDocument>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  professionalId: { type: Schema.Types.ObjectId, ref: 'Professional', required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], required: true },
  filePath: { type: String, required: true },
  appointment: {
    date: { type: Date, required: true },
    location: { type: String, required: true }
  },
  totalPrice: { type: Number, required: true }
});

export default mongoose.model<QuoteDocument>('Quote', quoteSchema);

