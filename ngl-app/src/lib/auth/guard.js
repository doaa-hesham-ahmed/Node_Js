
import jwt from "jsonwebtoken";
import { AppError } from "../error/error.js";
import { env } from "../config/env.js";

export function authGuard(req, _res, next) {
    try {
        const token = req.cookies?.["access-token"];

        if (!token) {
            throw new AppError("Access token is required", 401);
        }

        req.user = jwt.verify(
            token,
            env.jwt.accessSecret
        );

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return next(
                new AppError("Access token expired", 401)
            );
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return next(
                new AppError("Invalid access token", 401)
            );
        }

        next(error);
    }
}
