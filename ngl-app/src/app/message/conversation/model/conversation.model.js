import { model, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    originalMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message", 
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Conversation = model("Conversation", conversationSchema);
export default Conversation;