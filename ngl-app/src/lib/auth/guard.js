
import jwt from "jsonwebtoken";
import { AppError } from "../error/error.js";
import { env } from "../config/env.js";

export function Guard(req, res, next) {
    try {

        const token = req.cookies?.["access-token"];
        if (!token) throw new AppError("no Token Provider", 401);

        req.user = jwt.verify(token, env.jwt.secret);

        next();
    } catch (error) {
        next(error);
    }
}