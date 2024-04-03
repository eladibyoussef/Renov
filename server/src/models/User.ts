import mongoose, {  Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';


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

export interface UserDocument extends Document {
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
  // id: { type: String, required: false },
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
  }],

});

userSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
      return next();
  }
  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
  } catch (error:any) {
      console.log(error);
      next(error);
  }
});

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
  }
});


export default mongoose.model<UserDocument>('User', userSchema);