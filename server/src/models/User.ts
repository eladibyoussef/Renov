import mongoose, { Document, Schema } from 'mongoose';

interface Location {
  lat: number;
  long: number;
}

interface PaymentMethod {
  cardType: string;
  cardNumber: number;
}

interface Request {
  id: string;
  serviceType: string;
  priority: string;
  description: string;
  images: string[];
  quote: mongoose.Types.ObjectId;
}

interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  location?: Location;
  paymentMethods?: PaymentMethod[];
  cart?: mongoose.Types.ObjectId;
  requests?: Request[];
}

const userSchema = new Schema<UserDocument>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  address: { type: String, required: false },
  location: {
    lat: { type: Number, required: false },
    long: { type: Number, required: false }
  },
  paymentMethods: [{
    cardType: { type: String, required: false },
    cardNumber: { type: Number, required: false }
  }],
  cart: [{ type: Schema.Types.ObjectId, ref: 'Cart', required: false }],
  requests: [{
    id: { type: String, required: false },
    serviceType: { type: String, required: false },
    priority: { type: String, required: false },
    description: { type: String, required: false },
    images: [{ type: String, required: false }],
    quote: { type: Schema.Types.ObjectId, ref: 'Quote', required: false }
  }]
});

export default mongoose.model<UserDocument>('User', userSchema);


