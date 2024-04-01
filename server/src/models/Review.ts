import mongoose, { Schema, Document } from 'mongoose';

export interface ReviewDocument extends Document {
    rating: number;
    comment: string;
    professional: mongoose.Types.ObjectId; // this is a reference to the Professional document
    user: mongoose.Types.ObjectId; // this is a reference to the user document
    entityType: String,
    entityId: String

}

const reviewSchema: Schema<ReviewDocument> = new Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: false },
    entityType: {type: String, required: true},
    entityId: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
});

export default mongoose.model<ReviewDocument>('Review', reviewSchema);

