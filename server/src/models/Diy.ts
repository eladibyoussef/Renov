import mongoose, { Schema, Document } from 'mongoose';

interface DiyTutorial extends Document {
    title: string;
    relatedServicesCategory: string[];
    description: string;
    steps: {
        stepNumber: number;
        description: string;
        image: string;
        video: string;
    }[];
    difficulty: string;
    duration: string;
    recommendedProducts: mongoose.Types.ObjectId[];
}

const diyTutorialSchema: Schema<DiyTutorial> = new Schema({
    title: { type: String, required: true },
    relatedServicesCategory: { type: [String], required: true },
    description: { type: String, required: true },
    steps: [{
        stepNumber: { type: Number, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        video: { type: String, required: true }
    }],
    difficulty: { type: String, required: true },
    duration: { type: String, required: true },
    recommendedProducts: [{ type: mongoose.Types.ObjectId, ref: 'Product' }]
});

export default mongoose.model<DiyTutorial>('DIYTutorial', diyTutorialSchema);
