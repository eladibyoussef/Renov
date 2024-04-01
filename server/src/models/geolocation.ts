import mongoose, { Schema, Document } from 'mongoose';

interface Geolocation extends Document {
    name: string;
    latitude: number;
    longitude: number;
}

const geolocationSchema: Schema<Geolocation> = new Schema({
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
});

export default mongoose.model<Geolocation>('Geolocation', geolocationSchema);
