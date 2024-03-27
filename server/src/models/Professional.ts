import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface ProfessionalDocument extends Document {
  id: string;
  CIN: string;
  anthropometricCertificate: String;
  license: string;
  username: string;
  companyname: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  profilePicture:string;
  servicesProvided: string[];
  certificates?: string[];
  cart?: mongoose.Types.ObjectId;
  quoteRequests?: mongoose.Types.ObjectId;
  availability?: boolean;
  overallRating?: number;
  paymentMethods?: PaymentMethod[];
  portfolio?: Portfolio[];
  reviews?: Review[];
  aboutMe: string;
  approved:approved;
   permissions: string[]

}

interface PaymentMethod {
  cardType?: string;
  cardNumber?: number;
}

interface Portfolio {
  title: string;
  mediaType: string;
  mediaUrl: string;
}

interface Review {
  userId: string;
  rating: number;
  comment: string;
}
interface approved{
  approvalStatus:boolean;
  reason:string
}

const professionalSchema = new Schema<ProfessionalDocument>({
  CIN: { type: String, required: true },
  license: { type: String, required: true },
  anthropometricCertificate: {type:String , required:false},
  username: { type: String, required: true },
  companyname: {type:String, required:false},
  email: { type: String, required: true },
  password: { type: String, required: false },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  profilePicture: { type:String , required:false},
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
  aboutMe: { type: String, required: false },
  portfolio: [{
    title: { type: String, required: false },
    mediaType: { type: String, required: false },
    mediaUrl: { type: String, required: false }
  }],
  reviews: [{
    userId: { type: Schema.Types.ObjectId, required: false },
    rating: { type: Number, required: false },
    comment: { type: String, required: false }
  }],
  approved: { 
    approvalStatus:{type:Boolean , required:true , default:false},
    reason:{type:String , required:false}
  },
  permissions: [{ type: String, required: false }]

});

professionalSchema.pre<ProfessionalDocument>('save', async function (next) {
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

professionalSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
  }
});

export default mongoose.model<ProfessionalDocument>('Professional', professionalSchema);


