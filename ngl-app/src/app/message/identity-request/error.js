import { AppError } from "../../../lib/error/error.js";

export const MessageNotFound = new AppError("message Not exist",404);
export const MessageReceiverIdentifyReq = new AppError("Only the message receiver can request identity", 403);
export const reqAlreadyExist = new AppError("identified request is already exist",400);
export const reqNotExist = new AppError("Request not found", 404);
export const UnauthorizedReqToRes = new AppError("Unauthorized to respond to this request", 403);