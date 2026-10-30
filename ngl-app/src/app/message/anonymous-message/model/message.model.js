
import { model, Schema } from "mongoose";

const messageSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
      trim: true,
    },

    receiver: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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

const Message = model("Message", messageSchema);

export default Message;
