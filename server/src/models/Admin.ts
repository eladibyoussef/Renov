import mongoose, { Document, Schema } from 'mongoose';

interface AdminDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  permissions: string[];
}

const adminSchema = new Schema<AdminDocument>({
  id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  permissions: [{ type: String, required: true }]
});
export default mongoose.model<AdminDocument>('Admin', adminSchema);

