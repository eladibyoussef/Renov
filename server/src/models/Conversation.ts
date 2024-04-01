import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument } from "./User";

export interface ConversationDocument extends Document {
  participants: UserDocument[];
  messages: mongoose.Types.ObjectId[];
}

const conversationSchema: Schema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversation: Model<ConversationDocument> = mongoose.model<ConversationDocument>(
  "Conversation",
  conversationSchema
);

export default Conversation;
