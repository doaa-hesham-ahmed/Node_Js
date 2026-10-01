import { AppError } from "../../common/error/error.js";

export const otpExpired = new AppError("otp Expired, please resend otp",400);
export const invalidCode = new AppError("Invalid code",400);
export const invalidPassword = new AppError("Invalid Password",401);