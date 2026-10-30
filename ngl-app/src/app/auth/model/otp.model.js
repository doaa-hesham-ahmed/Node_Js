
import { model, Schema } from "mongoose";

const otpSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 6,
      match: /^\d{6}$/,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    expiredAt: {
      type: Date,
      required: true,
      expires: 0,
    },

    attempts: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Otp = model("Otp", otpSchema);

export default Otp;
