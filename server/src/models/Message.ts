
import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument } from "./User";

export interface MessageDocument extends Document {
  senderId: UserDocument["_id"];
  receiverId: UserDocument["_id"];
  message: string;
}

const messageSchema: Schema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message: Model<MessageDocument> = mongoose.model<MessageDocument>("Message", messageSchema);

export default Message;