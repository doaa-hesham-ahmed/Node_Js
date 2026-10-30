import { model, Schema } from "mongoose";

const conversationMessageSchema = new Schema(
  {
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ConversationMessage = model("ConversationMessage", conversationMessageSchema);
export default ConversationMessage;