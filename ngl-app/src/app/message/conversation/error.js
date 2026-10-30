import { AppError } from "../../../lib/error/error.js";

export const UnauthorizeAccessConversion = new AppError("Unauthorized access to this conversation", 403);
