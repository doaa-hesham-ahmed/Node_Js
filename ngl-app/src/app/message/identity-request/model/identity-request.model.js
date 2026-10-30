import { model, Schema } from "mongoose";

const identityRequestSchema = new Schema(
  {
    message: {
      type: Schema.Types.ObjectId,
      ref: "Message", // مرتبط بالرسالة الأصلية
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User", // مرسل الرسالة الأصلية (الذي يتلقى طلب كشف الهوية)
      required: true,
      index: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User", // مستلم الرسالة الأصلية (الذي طلب كشف الهوية)
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const IdentityRequest = model("IdentityRequest", identityRequestSchema);
export default IdentityRequest;