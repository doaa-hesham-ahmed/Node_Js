import { z } from 'zod';
import { AppError } from "../../common/error/error.js";

export function validateBody(dto, body) {
    // Corrected: call safeParse directly on the dto schema instance
    const result = z.safeParse(dto,body);
    
    if (result.success === false) {
        const errMessages = result.error.issues.map(issue => `${issue.path[0]} :${issue.message}`);
        throw new AppError(errMessages.join(' , '), 400);
    }
    
    return result.data;
}