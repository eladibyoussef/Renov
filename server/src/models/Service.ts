import mongoose, { Schema, Document } from 'mongoose';

interface SubCategory {
    name: string;
    description: string;
}

export interface ServiceDocument extends Document {
    name: string;
    description: string;
    subCategories: SubCategory[];
}

const subCategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const serviceCategorySchema: Schema<ServiceDocument> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    subCategories: { type: [subCategorySchema], required: true }
});

export default mongoose.model<ServiceDocument>('Service', serviceCategorySchema);
