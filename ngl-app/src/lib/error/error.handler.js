
import { logger } from "../../pkg/logger/logger.js";

export function globalErrorHandler(err, req, res, _next) {
    // Log the real error for debugging
    logger.error(err.message, {
        stack: err.stack,
        name: err.name,
        code: err.code,
        correlationId: req.correlatioId
    });

    if (err.isOperational === true) {
        return res.status(err.statusCode || 500).json({
            stack: err.stack,
            correlatioId: req.correlatioId,
            message: err.message,
            success: false
        });
    }

    return res.status(500).json({
        message: "Internal Server Error",
        correlatioId: req.correlatioId,
        success: false
    });
}