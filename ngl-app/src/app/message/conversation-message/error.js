import { AppError } from "../../../lib/error/error.js";

export const UnauthorizedDelMessage = new AppError("Unauthorized to delete this message", 403);