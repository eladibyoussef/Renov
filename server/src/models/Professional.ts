import mongoose, { Document, Schema } from 'mongoose';

interface ProfessionalDocument extends Document {
  id: string;
  CIN: string;
  license: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  servicesProvided: string[];
  certificates?: string[];
  cart?: mongoose.Types.ObjectId;
  quoteRequests?: mongoose.Types.ObjectId;
  availability?: boolean;
  overallRating?: number;
  paymentMethods?: PaymentMethod[];
  portfolio?: Portfolio[];
  reviews?: Review[];
}

interface PaymentMethod {
  cardType?: string;
  cardNumber?: number;
}

interface Portfolio {
  id: string;
  title: string;
  aboutMe: string;
  mediaType: string;
  mediaUrl: string;
}

interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
}

const professionalSchema = new Schema<ProfessionalDocument>({
  id: { type: String, required: true },
  CIN: { type: String, required: true },
  license: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  servicesProvided: [{ type: String, required: true }],
  certificates: [{ type: String, required: false }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'Cart', required: false }],
  quoteRequests: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  availability: { type: Boolean, required: false },
  overallRating: { type: Number, required: false },
  paymentMethods: [{
    cardType: { type: String, required: false },
    cardNumber: { type: Number, required: false }
  }],
  portfolio: [{
    id: { type: String, required: false },
    title: { type: String, required: false },
    aboutMe: { type: String, required: false },
    mediaType: { type: String, required: false },
    mediaUrl: { type: String, required: false }
  }],
  reviews: [{
    id: { type: String, required: false },
    userId: { type: String, required: false },
    rating: { type: Number, required: false },
    comment: { type: String, required: false }
  }]
});

export default mongoose.model<ProfessionalDocument>('Professional', professionalSchema);


