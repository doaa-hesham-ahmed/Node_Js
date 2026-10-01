import { AppError } from "../../common/error/error.js";

export const userNotExist = new AppError("User does not exist",404);
export const userAlreadyExist = new AppError("User already exist",409);
export const userAlreadyVerified = new AppError("you already verified",409);
