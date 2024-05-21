import mongoose, { Schema, Document } from 'mongoose';

interface SubCategory {
    name: string;
    description: string;
    photos: photo[];

}

export interface ServiceDocument extends Document {
    name: string;
    description: string;
    subCategories: SubCategory[];
    photos: photo[];

    
}
interface photo {
    url: string;
    cloudinaryId: string;
  }
const subCategorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    photos: [{
      url: { type: String, required: false },
      cloudinaryId: { type: String, required: false }    }
  ]
    
});

const serviceCategorySchema: Schema<ServiceDocument> = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    subCategories: { type: [subCategorySchema], required: true },
    photos: [{
      url: { type: String, required: false },
      cloudinaryId: { type: String, required: false }    }
  ],
    
});



serviceCategorySchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    }
  });

export default mongoose.model<ServiceDocument>('Service', serviceCategorySchema);
