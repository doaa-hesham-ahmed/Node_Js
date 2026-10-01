import { z } from 'zod';

export const registerODT = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    name: z.string().min(3, "Name must be at least 3 characters").max(20, "Name cannot exceed 20 characters").trim(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    provider: z.enum (['google','facebook','local']).default('local'),
    dob: z.date().optional(),
    gender: z.enum (['male','female']).optional()
});

export const verifyAcountODT = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    code: z.string().length(6, "Verification code must be 6 digits")
});

export const loginODT = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    password: z.string().min(1, "Password is required")
});

export const sendOtpODT = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim()
});

export const resetPasswordODT = z.object({
    email: z.string().email("Invalid email format").toLowerCase().trim(),
    code: z.string().length(6, "Verification code must be 6 digits"),
    newPassword: z.string().min(6, "New password must be at least 6 characters")
});