import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';


export interface adminDocument extends Document {
  /// <reference path="" />
  ref: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address?: string;
  permissions: string[];
}

const adminSchema = new Schema<adminDocument>({
  ref: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  permissions: [{ type: String, required: true }]
});

adminSchema.pre<adminDocument>('save', async function (next) {
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

adminSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
  }
});
export default mongoose.model<adminDocument>('Admin', adminSchema);

